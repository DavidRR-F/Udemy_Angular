import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('f') signupForm;
  defaultQuestion = 'pet';
  defaultGender = 'male';
  answer = '';
  genders = ['male', 'female', 'other'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender:''
  };
  submitted = false;
  
  suggestUserName() {
    const suggestedName = 'Superuser';

    // update single value in ngForm
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
    //update full value info
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
  }

  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(){
    this.submitted = true;
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gander;
    //reset form (empty inputs and reset states to defaults)
    this.signupForm.reset();
  }
}
