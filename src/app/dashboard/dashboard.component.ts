import { Component } from '@angular/core';
import { Auth, User, authState, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) { }

  ngOnInit(): void {
    authState(this.auth).subscribe(user => {
      if (user) {
        console.log('User logged in', user);
        this.currentUser = user;
      } else {
        console.error('auth user is null');
        this.router.navigate(['welcome']);
      }
    });
  }

  logout(): void {
    signOut(this.auth)
      .then( () => {
        this.router.navigate(['welcome']);
      })
      .catch ( error => {
        console.error('there was an error with the log out', error);
      });
  }

}
