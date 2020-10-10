import { AfterViewInit, Component, ContentChildren,  forwardRef, Injector,  Input, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';
import { StdBaseCvaComponent } from '../std-base-cva/std-base-cva.component';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-input2',
  templateUrl: './std-input2.component.html',
  styleUrls: ['./std-input2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StdInput2Component),
      multi: true,
    },
  ],
})
export class StdInput2Component extends StdBaseCvaComponent implements AfterViewInit {

  public innerFormControl: FormControl;

  constructor(stdForm: StdFormComponent) {
    super(stdForm);
    this.innerFormControl = new FormControl();
  }

  ngAfterViewInit(): void {
    this.innerFormControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  onBlur(): void {
    this.onTouch();
  }

  writeValue(value: any): void {
    this.innerFormControl.setValue(value);
  }
  
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.innerFormControl.disable();
    } else {
      this.innerFormControl.enable();
    }
  }

}

