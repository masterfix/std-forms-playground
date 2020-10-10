import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-label',
  templateUrl: './std-label.component.html',
  styleUrls: ['./std-label.component.css'],
})
export class StdLabelComponent {

  @Input('outerFormControl') formControl: FormControl;

  get required(): boolean {
    if (!this.formControl) {
      throw new Error('label: formControl is not set yet');
    }
    if (this.formControl.validator) {
        const validator = this.formControl.validator({} as AbstractControl);
        if (validator && validator.required) {
            return true;
        }
    }
    return false;
  }

}