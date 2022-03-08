import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as FromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub:Subscription;

  constructor(private authService: AuthService, private router: Router,
    private compResolver: ComponentFactoryResolver,
    private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    });
    console.log(this.authMode);
  }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.authMode = !this.authMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.authMode){
      // authObs = this.authService.login(email, password)
      this.store.dispatch(new AuthActions.loginStart({email: email, password: password}));
    } else {
      // authObs = this.authService.signup(email, password)
      this.store.dispatch(new AuthActions.signupStart({email: email, password: password}));
    }
    // replaced by ngonit sub
    // authObs.subscribe(resData => {
    //   console.log(resData);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes']);
    // },
    // errorMessage => {
    //   console.log(errorMessage);
    //   this.error = errorMessage;
    //   this.showErrorAlert(errorMessage);
    //   this.isLoading = false;
    // });
    
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.clearError());
  }

  //programatically show component

  private showErrorAlert(errorMessage: string) {
    //initialize
    const alertCmpFactory = this.compResolver.resolveComponentFactory(AlertComponent);
    //view container reference using placeholder directive
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    //clear previous renders
    hostViewContainerRef.clear();
    //create new component in reference
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    //get access to component instance and set component values (binding)
    componentRef.instance.message = errorMessage; 
    // unsubscribe and clear subscription
    componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
    
  }

}
