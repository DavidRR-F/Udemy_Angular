import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[app-better-highlight]'
})
export class BetterHighlightDirective implements OnInit{
  // allows host element to bind to variables in directive
  @Input() defualtColor: string = 'transparent';
  @Input('app-better-highlight') highlightColor: string = 'blue';

  // bind to properties of hosting element
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  //using renderer does not need access to the dom
  ngOnInit(): void {
      this.backgroundColor = this.defualtColor;
      //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }
  // use host listener to react to events
  // background blue on mouse hover
  @HostListener('mouseenter') mouseover(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }
  // background transparent on no mouse hover
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defualtColor;
  }

}
