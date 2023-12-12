import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-welcome-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule, RouterModule ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loginError: string | null = null;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(): string {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  login(): void {
    console.log(`login with email ${this.email.value}`);
    this.loginError = null;
    if (this.email.value && this.password.value) {
      signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
        .then((details) => {
          console.log('login successful', details);
          this.router.navigate(['dashboard']);
        })
        .catch((error) => {
          console.error('login error', error);
          if (error.code === 'auth/user-not-found') {
            this.loginError = 'This email address is not registered';
          } else if (error.code === 'auth/wrong-password') {
            this.loginError = 'Password is incorrect';
          } else {
            this.loginError = error.message;
          }
        });
    }
  }
}
