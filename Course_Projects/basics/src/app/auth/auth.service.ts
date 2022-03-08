import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";
import * as FromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    
    signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuVNgSelv28-Ddc3iP92_nI6UkEtxGV00';
    loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuVNgSelv28-Ddc3iP92_nI6UkEtxGV00';
    // just like subject but allows also gives access to previous subscription (used for auth-inteceptor)
    // user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;


    constructor(private http: HttpClient, private router: Router, 
        private store: Store<FromApp.AppState>) {}
    
    signup(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(
            this.signupUrl, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
        tap(
            resData => {
                this.handleUser(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            }
        ));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(this.loginUrl, 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
        tap(
            resData => {
                this.handleUser(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            }
        ));
    }

    logout() {
        //set user to initial state
        // this.user.next(null);
        this.store.dispatch(new AuthActions.logout());
    
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            // this.logout()
            this.store.dispatch(new AuthActions.logout())
        }, expirationDuration);
    }

    //for ngrx 
    clearLogoutTimer(){
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    // checks local storage for user snapshot to get login info 
    // JSON.parse turns string into JSON object literal
    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token,
            new Date(userData._tokenExpirationDate)
            );
        if(loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new AuthActions.authSuccess({
                email: loadedUser.email,
                userID: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate),
                redirect: false
            }));

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }
    private handleUser(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        // this.user.next(user);
        this.store.dispatch(new AuthActions.authSuccess({
            email: user.email,
            userID: user.id,
            token: user.token,
            expirationDate: expirationDate,
            redirect: true
        }));
        this.autoLogout(expiresIn * 1000);
        // allows you to write values to local storage
        // JSON.stringify converts a javascript object to a string
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'Unknown error occurred'
            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists';
                    break;
                case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                    errorMessage = 'This email or password does not exist';
                    break;            
            }
            return throwError(errorMessage);
    }
}