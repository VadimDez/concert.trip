/**
 * Created by vadimdez on 24.06.17.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Http } from '@angular/http';

@Injectable()
export class SpotifyAuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService, private http: Http) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}