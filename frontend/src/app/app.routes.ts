import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './components/common/auth.guard';
import { SpotifyAuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',       component: AppComponent, canActivate: [SpotifyAuthGuard] },
//   { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: '**',     component: AppComponent, canActivate: [SpotifyAuthGuard] },
];
