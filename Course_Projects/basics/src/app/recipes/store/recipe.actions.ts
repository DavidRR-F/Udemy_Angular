import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

// action string defs
export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipes';


// action classes
export class addRecipe implements Action {
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe) {}
}

export class deleteRecipe implements Action {
    readonly type = DELETE_RECIPE;
    constructor(public payload: number) {}
}

export class updateRecipe implements Action {
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, recipe: Recipe}) {}
} 

export class fetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

export class storeRecipes implements Action {
    readonly type = STORE_RECIPES;
}

export class setRecipes implements Action {
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){}
}

// type union
export type RecipesActions = 
setRecipes | 
fetchRecipes | 
addRecipe | 
updateRecipe | 
deleteRecipe | 
storeRecipes;