import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routes } from './app.routes';
import { AuthGuard } from './components/common/auth.guard';

// Local components
import { LoginComponent } from './components/login/login.component'
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { BudgetWidgetComponent } from './budget-widget/budget-widget.component';
import { ConcertPackageComponent } from './concert-package/concert-package.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SpotifyAuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';
import { CookieModule } from 'ngx-cookie';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    ListComponent,
    ArtistListComponent,
    BudgetWidgetComponent,
    ConcertPackageComponent,
    HeaderBarComponent,
    MainComponent,
    PackageDetailComponent
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    CookieModule.forRoot()
  ],
  providers: [
    AuthGuard,
    SpotifyAuthGuard,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
