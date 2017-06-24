import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SpotifyAuthGuard } from './guards/auth.guard';
import { Login } from './components/login/login.component';

export const routes: Routes = [
  { path: '',       component: Login, canActivate: [SpotifyAuthGuard] },
  { path: 'home',   component: AppComponent, canActivate: [SpotifyAuthGuard]  },
];
