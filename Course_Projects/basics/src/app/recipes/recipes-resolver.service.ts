import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as FromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, of, switchMap, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(
        private dataStorageService: DataStorageService, 
        private recipesService: RecipeService,
        private store: Store<FromApp.AppState>,
        private actions$: Actions
        ) {}
    // subscribes for u to resolve once data is there
    // runs fetch recipe whenever specified routes get loaded in app module
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const recipes = this.recipesService.getRecipes();
        // // fetch if array is empty
        // if(recipes.length === 0){
        //     return this.dataStorageService.fetchRecipes();
        // } else { // else return recipes (so updates still work)
        //     return recipes;
        // }
        
        // dispatch fetch function and wait for recipe to be set before returning
        // conditional statement: doesnt refetch data if already in storage
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length === 0){
                    this.store.dispatch(new RecipesActions.fetchRecipes());
                    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPES), take(1));
                } else{ 
                    return of(recipes);
                }
            })
        );
    }

}