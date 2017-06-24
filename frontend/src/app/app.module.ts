import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routes } from './app.routes';
import { AuthGuard } from './components/common/auth.guard';

// Local components
import { Login } from './components/login/login.component'


@NgModule({
  declarations: [
    Login
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
})
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [Login]
})
export class AppModule { }
