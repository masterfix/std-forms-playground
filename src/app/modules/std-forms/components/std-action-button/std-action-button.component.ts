import { Component, EventEmitter,  Output } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { StdFormComponent } from '../std-form/std-form.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'std-action-button',
  templateUrl: './std-action-button.component.html',
  styleUrls: ['./std-action-button.component.css'],
})
export class StdActionButtonComponent {

  @Output() action = new EventEmitter();

  constructor(private controlContainer: ControlContainer, private stdForm: StdFormComponent) {}

  onClick() {
    console.log('emit click event');
    this.action.emit();
  }

}