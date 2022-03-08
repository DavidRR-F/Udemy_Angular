import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

// used to help catch errors
// angular wont yell at you for misspelling a string but it will 
// for misspelling a value so you import action values into reducer.ta
export const ADD_INGREDIENT = 'ADD_INGREDIENT'; 
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS'; 
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT'; 
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'; 
export const START_EDIT = 'START_EDIT';
export const START_STOP = 'START_STOP';

export class addIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class addIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class updateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class deleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class startEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
}

export class startStop implements Action {
    readonly type = START_STOP;
}

export type ShoppingListActions = 
    addIngredient | 
    addIngredients | 
    updateIngredient |
    deleteIngredient | 
    startEdit |
    startStop;
