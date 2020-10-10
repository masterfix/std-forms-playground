import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-debug-form-group',
  templateUrl: './std-debug-form-group.component.html',
  styleUrls: ['./std-debug-form-group.component.css'],
})
export class StdDebugFormGroupComponent {

  @Input('outerFormGroup') formGroup: FormGroup;

  get errors(): any {
    return this.getErrorsFromControl(this.formGroup);
  }

  private getErrorsFromControl(control: AbstractControl, name?: string): any {
    
    if (control instanceof FormControl) {
      //console.log(control.errors);
      if (control.errors) {
        return control.errors;
      }
      return null;
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      
      const errors = {};
      Object.keys(control.controls).forEach(key => {
        const childControl = control.controls[key];
        const childErrors = this.getErrorsFromControl(childControl, key);
        if (childErrors) {
          errors[key] = childErrors;
        }
      });
      return errors;
    
    }

  }

}