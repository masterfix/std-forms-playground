import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-debug-form-control',
  templateUrl: './std-debug-form-control.component.html',
  styleUrls: ['./std-debug-form-control.component.css'],
})
export class StdDebugFormControlComponent {

  @Input('outerFormControl') formControl: FormControl;

}