import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Burger',
     'For Tesing',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ]),
    new Recipe('Oats',
     'For Tesing',
      'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png', 
      [
        new Ingredient('Oats', 1),
        new Ingredient('Milk', 1),
        new Ingredient('Brown Sugar', 1)
      ])
  ];

  getRecipes() {
    // return copy of recipes array
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  constructor(private slService: ShoppingListService) {}
}
