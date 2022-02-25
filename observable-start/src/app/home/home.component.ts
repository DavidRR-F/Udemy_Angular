import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSub: Subscription;

  constructor() { }

  ngOnInit() {
    // observables are from rxjs
    // new event emitted every second
    // this.firstSub = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );
    // creating custom observable
    // the observer is the parameter that listens to data
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        // .next emits new value
        observer.next(count);
        if(count == 2){
          // .complete halts observer (completes/unsubscribes)
          observer.complete();
        }
        if(count > 3){
          // throw observer error and stop emiting observer (cancels/unsubscribes observer)
          observer.error(new Error('count is greater than 3'));
        }
        count++;
      },1000)
    });

    //operators (pipe adds operators)
    // customIntervalObservable.pipe(
    //   map( (data: number) => {
    //     return 'Round: ' + (data + 1);
    //     }
    //   )
    // )

    // subscribe to custom observable
    this.firstSub = customIntervalObservable.pipe(
      // filter returns value based on logic
      // Ex: returns data its greater than 0 
      // so console log in subscribe will start at Round: 2
      filter(
        (data: number) => {
          return data > 0;
        }
      ),
      // map is an operator that returns new data and maps it to the data variable in subscribe
      map( (data: number) => {
        return 'Round: ' + (data + 1);
        }
      )
    ).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Complete');
        // complete subscribe event to do some clean up
        // does not fire on error only on complete
      }
    );
  }

  ngOnDestroy(): void {
    // clears observable subscription to prevent memory leaks
    this.firstSub.unsubscribe();
  }

}
