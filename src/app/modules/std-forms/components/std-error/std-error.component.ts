import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
TemplateRef
} from "@angular/core";
import {
  FormControl,
  ValidationErrors
} from "@angular/forms";
import { StdErrorDirective } from "../../directives/std-error/std-error.directive";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "std-error",
  templateUrl: "./std-error.component.html",
  styleUrls: ["./std-error.component.css"]
})
export class StdErrorComponent implements OnInit, AfterViewInit {
  
  @Input('outerFormControl') formControl: FormControl;
  @Input('stdErrors') stdErrors: QueryList<StdErrorDirective>;

  constructor() {}

  ngOnInit(): void {
    //console.log("onInit (error)");
  }

  ngAfterViewInit(): void {
    //console.log("afterViewInit (error)");
  }

  get errors(): ValidationErrors | null {
    return this.formControl.errors;
  }

  getErrorsArray(): Array<{ key: string; data: any }> {
    const errors = [];
    Object.keys(this.errors).forEach(key => {
      errors.push({ key, data: this.errors[key] });
    });
    return errors;
  }

  getCustomErrorTemplateRef(errorKey: string): TemplateRef<any> | null {
    const error = this.stdErrors.find(stdError => stdError.key === errorKey);
    return error ? error.templateRef : null;
  }

  customErrorExists(errorKey: string): boolean {
    const templateRef = this.getCustomErrorTemplateRef(errorKey);
    const result = templateRef ? true : false;
    console.log('customErrorExists(', errorKey, '):', result);
    return result;
  }

}
