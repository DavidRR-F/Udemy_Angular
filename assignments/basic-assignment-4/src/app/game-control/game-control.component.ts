import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit, DoCheck {
  @Output() interval = new EventEmitter<number>();
  id: any;
  lastnumber = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngDoCheck(){
    console.log(this.interval);
  }


  startGame(){
    this.id = setInterval(() => {this.interval.emit(this.lastnumber += 1)}, 1000);
  }

  pauseGame(){
    clearInterval(this.id);
  }

}
