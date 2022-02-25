import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServerModel } from "../servers.model";
import { ServersService } from "../servers.service";
@Injectable()
export class ServerResolver implements Resolve<ServerModel> {
    
    constructor(private serversService: ServersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    ServerModel | Observable<ServerModel> | Promise<ServerModel> {
        return this.serversService.getServer(+route.params['id']);        
    }
}