import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactiveGaurd } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent}
    ]},
    {path: 'servers', //canActivate: [AuthGuardService]
    canActivateChild: [AuthGuardService]
    , component: ServersComponent, children: [
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactiveGaurd]},
      {path: ':id', resolve: {sever: ServerResolver}, component: ServerComponent},
    ]},
    // {path: 'not-found', component: PageNotFoundComponent},
    //data property allows passing of static objects
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    //catch all unknown paths a redirect to 404 component
    // must be last route in array
    {path: '**', redirectTo: '/not-found'}
  ];
  
  //{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 
  // path match full will only rediect you if the the full path is ''

@NgModule({
    imports: [
      //hash mode routing makes the server only care about routes before the hashtag in http
      //allows running on servers the dont return the index html file on 404 errors
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}