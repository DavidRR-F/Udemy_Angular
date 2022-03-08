import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as FromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Store } from "@ngrx/store";
// use when other services are injected
@Injectable({ providedIn: 'root' })
export class DataStorageService {
    
    url = 'https://udemy-practice-api-default-rtdb.firebaseio.com/recipes.json';
    
    constructor(private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService,
        private store: Store<FromApp.AppState>
        ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.url, recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
            return this.http.get<Recipe[]>(this.url).pipe( 
            map(recipes => {
                // this map is a javascript array method not same as map in pipe
                // for each recipe if has ingredients set them else set ingredient tempty array
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            tap(recipes => {
                // this.recipeService.setRecipes(recipes);
                this.store.dispatch(new RecipesActions.setRecipes(recipes));
            }) 
            );
    }

}