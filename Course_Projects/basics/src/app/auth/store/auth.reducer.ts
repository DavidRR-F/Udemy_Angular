import { User } from "../user.model";
import * as AuthActions from './auth.actions';


const initialState: State = {
    user: null,
    authError: null,
    loading: false
}

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

export function authReducer (
    state = initialState, 
    action: AuthActions.AuthActions
    ) {
    switch(action.type) {
        case AuthActions.AUTH_SUCCESS:
            const user = new User(
                action.payload.email,
                action.payload.userID,
                action.payload.token,
                action.payload.expirationDate
                );
            return { 
                ...state,
                user: user,
                authError: null,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case AuthActions.LOGIN_START || AuthActions.SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.AUTH_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default: 
            return state;
    }
}