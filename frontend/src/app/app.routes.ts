import { Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { AuthGuard } from './components/common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login', component: Login },
//   { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: '**',     component: Login },
];
