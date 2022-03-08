import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as FromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Burger',
  //    'For Tesing',
  //     'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Buns', 2)
  //     ]),
  //   new Recipe('Oats',
  //    'For Tesing',
  //     'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png', 
  //     [
  //       new Ingredient('Oats', 1),
  //       new Ingredient('Milk', 1),
  //       new Ingredient('Brown Sugar', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  getRecipes() {
    // return copy of recipes array
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addToShoppingList(ingredients: Ingredient[]){
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.addIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  constructor(private slService: ShoppingListService, 
    private store: Store<FromApp.AppState>) {}
}
