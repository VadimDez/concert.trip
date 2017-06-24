/**
 * Created by vadimdez on 24.06.17.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie';
@Injectable()
export class SpotifyAuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (state.root.queryParams.token) {
    //   this.cookieService.put('token', state.root.queryParams.token);
    // }

    return true;
  }
}