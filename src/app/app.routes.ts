import { Routes } from '@angular/router';

import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewAccountComponent } from './new-account/new-account.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['welcome']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToApp },
  },
  {
    path: 'new-account',
    component: NewAccountComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToApp },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];
