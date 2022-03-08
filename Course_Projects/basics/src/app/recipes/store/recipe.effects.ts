import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';
import * as FromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(fetchAction => {
                return this.http.get<Recipe[]>(environment.fetchUrl);
        }),
        map(recipes => {
            // this map is a javascript array method not same as map in pipe
            // for each recipe if has ingredients set them else set ingredient tempty array
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        map(recipes => {
            return new RecipesActions.setRecipes(recipes);
        })
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put(environment.fetchUrl, recipesState.recipes)
        })
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private router: Router,
        private store: Store<FromApp.AppState>
    ) {}



    
}