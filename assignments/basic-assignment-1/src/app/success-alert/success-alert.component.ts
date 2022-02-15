import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  template: `<h3>Success!</h3>`,
  styles: [`
    h3 {
      color: green;
    }
  `]
})
export class SuccessAlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
