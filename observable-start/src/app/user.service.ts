import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {
    // activatedEmitter = new EventEmitter<boolean>();
    // subject is an observable object you can subscribe to and call next from outside
    // its more active than observable
    // used for actively triggered events (buttons n stuff) 
    // if cross component emitters (not in @Outputs)
    // were observables are for passively triggered events
    activatedEmitter = new Subject<boolean>();
}