import { AfterContentInit, AfterViewInit, Component, ContentChildren, HostBinding, Input, QueryList } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl } from '@angular/forms';
import { StdErrorDirective } from '../../directives/std-error/std-error.directive';
import { StdRadiobuttonDirective } from '../../directives/std-radiobutton/std-radiobutton.directive';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-radiobutton-group',
  templateUrl: './std-radiobutton-group.component.html',
  styleUrls: ['./std-radiobutton-group.component.css'],
})
export class StdRadiobuttonGroupComponent implements AfterViewInit, AfterContentInit, ControlValueAccessor {

  @Input() label: string;

  @Input() debug: boolean;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;

  @ContentChildren(StdRadiobuttonDirective) radioButtons: QueryList<StdRadiobuttonDirective>;

  public formGroup: FormGroup;
  public radioControl: FormControl;

  public onChange: (value: any) => void;
  public onTouch: () => void;

  public isRequired = false;

  constructor(private ngControl: NgControl, private stdForm: StdFormComponent) {
    this.ngControl.valueAccessor = this;
    this.radioControl = new FormControl();
    this.formGroup = new FormGroup({
      radio: this.radioControl,
    });
  }

  @HostBinding('class.invalid')
  get invalid(): boolean {
    return this.ngControl.touched && this.ngControl.invalid;
  }

  get mergedDebug(): boolean {
    return this.debug !== undefined ? !!this.debug : !!this.stdForm.debug;
  }

  ngAfterViewInit(): void {
    //console.log('afterViewInit');
    this.radioControl.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouch(); // TODO think about this
    });
  }

  ngAfterContentInit(): void {
    if (this.radioButtons.length === 0) {
      throw new Error('no radio button values found, please add at least one std-radiobutton child');
    }
  }

  onBlur(): void {
    //console.log('onBlur');
    this.onTouch();
  }

  writeValue(value: any): void {
    //console.log('writeValue:', value);
    this.radioControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    //console.log('registerOnChange');
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    //console.log('registerOnTouched');
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

}
