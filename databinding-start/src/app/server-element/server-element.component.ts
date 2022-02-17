import { Component, Input, OnChanges, DoCheck, OnInit, SimpleChange, SimpleChanges, 
  ViewEncapsulation, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { myServer } from '../server.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // overrides encapsulation of css
  // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements 
OnInit, OnChanges, DoCheck, AfterContentInit, 
AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
// decoratorer to pass element from app.component
  @Input('srvElement') element: myServer;
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  // view child for reference variable in other component
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('constructor called');
   }
  //Lifehook Functions
   // runs first lets you react to initail values
  ngOnChanges(changes: SimpleChanges) {
    console.log('onChanges called');
    console.log(changes);
  }
  // runs on initialization
  ngOnInit() {
    console.log('OnInit called');
  }
  // gets called when angular makes any changes
  ngDoCheck() {
    console.log('ngDoCheck called');
  }
  // called after content is initiated were values can first be accessed
  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
    console.log(this.paragraph.nativeElement.textContent);
  }
  // called after each change ditection cycle
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }
  // happenes after content check gives access to template elements
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    console.log(this.header.nativeElement.textContent);
  }
  // called after each change ditection cycle
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }
  // happens on component destruction
  ngOnDestroy() {
  }

}
