import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[std-radiobutton]' })
export class StdRadiobuttonDirective {

  @Input('std-radiobutton') value: any;

  constructor(public templateRef: TemplateRef<any>) {}
}