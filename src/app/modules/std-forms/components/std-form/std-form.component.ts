import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "std-form",
  templateUrl: "./std-form.component.html",
  styleUrls: ["./std-form.component.css"]
})
export class StdFormComponent {
  
  @Input() formGroup: FormGroup;
  @Input() debug = false;

}
