import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';;
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  prodForm: FormGroup;
  forbiddenUsername = 'Test';

  ngOnInit(): void {
    this.prodForm = new FormGroup(
      {
        'projectInfo': new FormGroup({
          'name': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)],
          this.asyncForbiddenName.bind(this)),
          'email': new FormControl(null, [Validators.required, Validators.email]),
        }),
        'status': new FormControl('stable')
      }
    );
  }

  onSubmit() {
    console.log(this.prodForm);
  }

  forbiddenName(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsername === control.value){
      return {'nameIsForbidden': true};
    }
    // don't return false
    return null;
  }

  asyncForbiddenName(control: FormControl): Promise<boolean> | Observable<boolean> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value === this.forbiddenName) {
            resolve({'nameIsForbidden2': true});
          } else {
            resolve(null);
          }
        }, 2000);
      }
    );
    return promise;
  }

}
