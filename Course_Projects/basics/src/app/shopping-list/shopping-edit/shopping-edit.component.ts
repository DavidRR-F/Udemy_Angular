import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as FromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription : Subscription;
  editMode = false;
  // editIndex: number;
  editItem: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<FromApp.AppState>
    ) { }

  ngOnInit(): void {
    // this.subscription = this.slService.startEdit.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.editIndex = index;
    //     this.editItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editItem.name,
    //       amount: this.editItem.amount
    //     });
    //   }
    // );
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      } else{
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.startStop());
  }

  // onAdd(name: HTMLInputElement, amount: HTMLInputElement){
  //   this.slService.addIngredient(new Ingredient(name.value, parseInt(amount.value)));
  // }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, parseInt(value.amount));
    if(!this.editMode){
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.addIngredient(newIngredient));
      console.log(newIngredient);
    } else {
      // this.slService.updateIngredient(this.editIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.updateIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.startStop());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editIndex);
    this.store.dispatch(new ShoppingListActions.deleteIngredient());
    this.onClear();
  }

}
