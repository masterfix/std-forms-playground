import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, ControlContainer } from "@angular/forms";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "std-save-button",
  templateUrl: "./std-save-button.component.html",
  styleUrls: ["./std-save-button.component.css"]
})
export class StdSaveButtonComponent {
  @Output() action = new EventEmitter();
  @Output() save = new EventEmitter<SaveEvent>();

  constructor(private controlContainer: ControlContainer) {}

  get formControl(): AbstractControl {
    return this.controlContainer.control;
  }

  onAction() {
    this.action.emit();
    this.formControl.markAllAsTouched();
    this.save.emit({
      formValid: this.formControl.valid,
      formValue: this.formControl.value
    });
  }
}

export interface SaveEvent {
  formValid: boolean;
  formValue: any;
}
