import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({ selector: 'ng-template[std-error]' })
export class StdErrorDirective {

  @Input('std-error') key: string;

  constructor(public templateRef: TemplateRef<any>) {}

}