import { Action } from "@ngrx/store";

export const LOGIN_START = 'LOGIN_START';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const CLEAR_ERROR = 'CLEAR_ERROR';


export class clearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class signupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {email: string; password: string}) {}
}

export class authSuccess implements Action {
    readonly type = AUTH_SUCCESS;
    constructor(public payload: {
        email: string;
        userID: string;
        token: string;
        expirationDate: Date;
        redirect: boolean;
    }) {}
}

export class logout implements Action {
    readonly type = LOGOUT;
}

export class loginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string; password: string}){}
}

export class authFail implements Action {
    readonly type = AUTH_FAIL;
    constructor(public payload: string) {}
}

export class autoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type AuthActions = 
authSuccess | 
logout | 
loginStart |
authFail | 
signupStart | 
clearError |
autoLogin;