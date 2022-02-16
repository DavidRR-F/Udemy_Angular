import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-assignment-3';
  displayStatus = false;
  clickLog: Array<number> = [];

  toggleDisplay() {
    this.displayStatus = this.displayStatus === true ? false : true;
    this.clickLog.push(this.clickLog.length+1)
  }

  getColor() {
    
  }
}
