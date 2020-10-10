import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-label',
  templateUrl: './std-label.component.html',
  styleUrls: ['./std-label.component.css'],
})
export class StdLabelComponent {

  constructor(private ngControl: NgControl) {}

  get required(): boolean {
    if (!this.ngControl.control) {
      throw new Error('label: formControl is not set yet');
    }
    if (this.ngControl.control.validator) {
        const validator = this.ngControl.control.validator({} as AbstractControl);
        if (validator && validator.required) {
            return true;
        }
    }
    return false;
  }

}