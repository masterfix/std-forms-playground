import { Component, ContentChildren, Input, QueryList } from "@angular/core";
import { StdErrorDirective } from "../../directives/std-error/std-error.directive";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "std-form",
  templateUrl: "./std-form.component.html",
  styleUrls: ["./std-form.component.css"]
})
export class StdFormComponent {
  @Input() debug = false;

  @ContentChildren(StdErrorDirective) stdErrors: QueryList<StdErrorDirective>;
}
