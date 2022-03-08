import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-inteceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [ShoppingListService, RecipeService, 
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
//use for interceptors or other provider services if not providedIn: 'root'
export class CoreMudule {}