import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SpotifyAuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './main/main.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [SpotifyAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'detail',
        component: PackageDetailComponent
      },
    ]
  },
];
