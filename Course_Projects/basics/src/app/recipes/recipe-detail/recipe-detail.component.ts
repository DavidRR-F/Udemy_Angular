import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as FromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { map, switchMap } from 'rxjs';
import * as SHoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input('recipe') recipe: Recipe;
  
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.id = +params['id'];
    //     // this.recipe = this.recipeService.getRecipe(this.id);
    //   }
    // );
    this.route.params.pipe(
      map((params: Params) => {
        return +params['id'];
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes')
      }),
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })
    )
    .subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  onAddToShoppingList(){
    // this.recipeService.addToShoppingList(this.recipe.ingredients);
    this.store.dispatch(new SHoppingListActions.addIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.deleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
