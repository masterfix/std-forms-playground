import { Component, HostBinding,  Input, QueryList, TemplateRef } from "@angular/core";
import { AbstractControl, NgControl } from "@angular/forms";
import { StdErrorDirective } from "../../directives/std-error/std-error.directive";

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-error',
  templateUrl: './std-error.component.html',
  styleUrls: ['./std-error.component.css']
})
export class StdErrorComponent {
  
  @Input('stdErrors') stdErrors: QueryList<StdErrorDirective>;

  constructor(private ngControl: NgControl) {}

  get formControl(): AbstractControl {
    return this.ngControl.control;
  }

  @HostBinding('class.invisible')
  get invisible(): boolean {
    return !(this.ngControl.control.touched && !!this.ngControl.control.errors);
  }

  getErrorsArray(): Array<{ key: string; data: any }> {
    const errors = [];
    Object.keys(this.formControl.errors).forEach(key => {
      errors.push({ key, data: this.formControl.errors[key] });
    });
    return errors;
  }

  getCustomErrorTemplateRef(errorKey: string): TemplateRef<any> | null {
    const error = this.stdErrors.find(stdError => stdError.key === errorKey);
    return error ? error.templateRef : null;
  }

}
