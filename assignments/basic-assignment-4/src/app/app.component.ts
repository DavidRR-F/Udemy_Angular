import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNum: number[] = [];
  evenNum: number[] = [];

  onInterval(num: number){
    if(num % 2 === 0){
      this.evenNum.push(num);
    } else{
      this.oddNum.push(num);
    }
  }
}
