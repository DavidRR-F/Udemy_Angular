import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import * as FromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService,
        private store: Store<FromApp.AppState>) {}
        //take has a num param that tells how many values to get before unsubscribing
        // exhaustMap waits for the first observable (user) to complete takes that data into 
        // the new (inner) observable 
        // which will replace the previous observable (user)
        // used to put user token in http request
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // return this.authService.user
        return this.store.select('auth')
        .pipe(
            take(1), 
            map(authState => {
                return authState.user;
            }),// map for ngrx to get user from object
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }
                const modReq = req.clone({params: new HttpParams().set('auth', user.token)});
                return next.handle(modReq);
            }));
    }
}