import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from './app-validators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public static firstNameField = 'firstName';
  public static lastNameField = 'lastName';
  public static emailField = 'email';
  public static genderField = 'gender';

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      [AppComponent.firstNameField]: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(0),
          ],
        }
      ),
      [AppComponent.lastNameField]: new FormControl(
        'Doe',
      ),
      [AppComponent.genderField]: new FormControl(
        null,
        {
          validators: [
            Validators.required,
          ]
        }
      ),
      [AppComponent.emailField]: new FormControl(
        'john@doe.com',
        {
          validators: [
            Validators.required,
            Validators.email,
          ],
          asyncValidators: [
            AppValidators.uniqueEmail
          ]
        }
      ),
    }, {updateOn: "blur"});
    this.form.statusChanges.subscribe(change => {
      //console.log('form status change:', change);
    });
  }

  onSave(): void {
    console.log('save clicked');
    this.form.markAllAsTouched();
  }

  get firstName(): FormControl {
    return this.form.get(AppComponent.firstNameField) as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get(AppComponent.lastNameField) as FormControl;
  }

  get email(): FormControl {
    return this.form.get(AppComponent.emailField) as FormControl;
  }

  get gender(): FormControl {
    return this.form.get(AppComponent.genderField) as FormControl;
  }

}