import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './components/common/auth.guard';

export const routes: Routes = [
  { path: '',       component: AppComponent },
//   { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: '**',     component: AppComponent },
];
