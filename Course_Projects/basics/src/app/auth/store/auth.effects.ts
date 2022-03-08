import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment'
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.loginStart) => {
            return this.http.post<AuthResponseData>(environment.loginUrl + environment.firebaseAPIKey, 
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    //set logout timer
                    this.authService.autoLogout(+resData.expiresIn * 1000);
                }),
                map(resData => {
                    // handle post
                    return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                }),
                catchError(errorRes => {
                    //handle errors
                    return handleError(errorRes);
                })
            )
        })
    );

    @Effect()
    authSignup = this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAction: AuthActions.signupStart) => {
                return this.http.post<AuthResponseData>(
                    environment.signupUrl + environment.firebaseAPIKey, 
                    {
                        email: signupAction.payload.email,
                        password: signupAction.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap(resData => {
                        this.authService.autoLogout(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleAuth(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
    );

    @Effect({dispatch: false})
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTH_SUCCESS),
        tap((authSuccessAction: AuthActions.authSuccess) => {
            if(authSuccessAction.payload.redirect){
                this.router.navigate(['/']);
            }
        })
    );

    @Effect({dispatch: false})
    autoLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if(!userData){
                return {type: 'DUMMY' };
            }
            const loadedUser = new User(
                userData.email, 
                userData.id, 
                userData._token,
                new Date(userData._tokenExpirationDate)
                );
            if(loadedUser.token) {
                // this.user.next(loadedUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.autoLogout(expirationDuration);
                return new AuthActions.authSuccess({
                    email: loadedUser.email,
                    userID: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
                
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                // this.autoLogout(expirationDuration);
            }
            return {type: 'DUMMY' };
        })
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private authService: AuthService
        ) {}
}

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export const handleAuth = (expiresIn: number, email: string, userID: string, token: string) => 
    {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, userID, token, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        return new AuthActions.authSuccess({
                email: email,
                userID: userID,
                token: token,
                expirationDate: expirationDate,
                redirect: true
            }
        );
    };

export const handleError = (errorRes: any) => {
    // returns new observable so the effect stream doesnt die
    let errorMessage = 'Unknown error occurred'
    if (!errorRes.error || !errorRes.error.error){
        return of(new AuthActions.authFail(errorMessage));
    }
    switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
            break;
        case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
            errorMessage = 'This email or password does not exist';
            break;            
    }
        return of(new AuthActions.authFail(errorMessage));
};