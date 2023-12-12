import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


const matchingPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirm');

  console.log('validator output = ', (password && confirm && password.value === confirm.value ? { matchingPasswords: true } : null));
  return password && confirm && password.value !== confirm.value ? { matchingPasswords: true } : null;
};

@Component({
  selector: 'app-new-account',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule ],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent {

  accountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required])},
    { validators: matchingPasswordValidator });
  errors: string | null = null;

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {
  }

  get email(): AbstractControl | null {
    return this.accountForm.get('email');
  }

  get name(): AbstractControl | null {
    return this.accountForm.get('name');
  }

  getEmailErrorMessage(): string {
    const emailField = this.accountForm.get('email');
    if (emailField) {
      if (emailField.hasError('required')) {
        return 'You must enter a value';
      } else if (emailField.hasError('email')) {
        return 'Not a valid email';
      } else {
        return '';
      }
    } else {
      return 'Error could not find email field';
    }
  }

  async create() {
    const email = this.accountForm.get('email')?.value as string;
    const password = this.accountForm.get('password')?.value as string;
    const name = this.accountForm.get('name')?.value as string;
    
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(credential.user, {displayName: name});
      this.router.navigate(['dashboard']);
    } catch (error) {
      console.error('There was an issue creating the user', error);
      this.errors = error as string;
    }
    
  }
}
