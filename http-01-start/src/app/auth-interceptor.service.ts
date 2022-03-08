import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInteceptorService implements HttpInterceptor{
    // can have as many interceptors as you want
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // modify requests
        // ex: add header
        const modreq = req.clone({headers: req.headers.append('Auth', 'xyz')});
        // return moded request
        // pipe to mod/check/log response (use map for moding)
        return next.handle(modreq);
    }
}