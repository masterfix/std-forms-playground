import { AfterViewInit, Component, ContentChildren,  forwardRef, Host, Input, Optional, QueryList, SkipSelf } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-input',
  templateUrl: './std-input.component.html',
  styleUrls: ['./std-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StdInputComponent),
      multi: true,
    },
  ],
})
export class StdInputComponent implements AfterViewInit, ControlValueAccessor {

  @Input('formControl') outerFormControl: FormControl;

  @Input() label: string;

  @Input() debug: boolean;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;

  formControl: FormControl;

  onChange: (value: any) => void;
  onTouch: () => void;

  constructor(
    private stdForm: StdFormComponent,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {
    this.formControl = new FormControl();

    console.log('controlContainer:', this.controlContainer);
  }

  ngAfterViewInit(): void {
    this.formControl.valueChanges.subscribe(value => {
      this.onChange(value);
    });
  }

  get mergedDebug(): boolean {
    return this.debug !== undefined ? !!this.debug : !!this.stdForm.debug;
  }

  onBlur(): void {
    this.onTouch();
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  get invalid(): boolean {
    return this.outerFormControl.touched && this.outerFormControl.invalid;
  }

  get pending(): boolean {
    return this.outerFormControl.touched && this.outerFormControl.status === 'PENDING';
  }

}

