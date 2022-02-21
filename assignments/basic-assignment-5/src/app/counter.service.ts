import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  count: number = 0;

  onSwitch() {
    this.count += 1;
    return this.count;
  }
  
}
