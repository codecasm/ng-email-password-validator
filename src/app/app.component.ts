import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from './password-validator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            PasswordValidator.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            PasswordValidator.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            PasswordValidator.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            PasswordValidator.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: PasswordValidator.passwordMatchValidator
      }
    );
  }

  submit() {
    // do signup or something
    console.log(this.signupForm.value);
  }
}
