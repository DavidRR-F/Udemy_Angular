import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  //reverse if statment (must be same name as selector)
  @Input() set appUnless(condition: boolean) {
    if(!condition){
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  //html template and container placement
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
