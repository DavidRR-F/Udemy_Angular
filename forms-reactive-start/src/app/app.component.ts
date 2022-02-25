import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  // holds our form
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    //initialize form and add controls (default values validators etc)
      this.signUpForm = new FormGroup({
        'userData': new FormGroup({
          'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          'email': new FormControl(null, [Validators.required, Validators.email], 
            this.forbiddenEmails) //bind this if used in function
        }),
        'gender': new FormControl('male'), //default gender
        'hobbies': new FormArray([])
      });
      // view value and status changes of form
      // this.signUpForm.valueChanges.subscribe(
      //   (value) => {
      //     console.log(value);
      //   }
      // );
      this.signUpForm.statusChanges.subscribe(
        (status) => {
          console.log(status);
        }
      );
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobbies() {
    //push to hobbies array
    (<FormArray>this.signUpForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }
  // create a validator
  // check if username is allowed
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    // don't return false
    return null;
  }
  //async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
