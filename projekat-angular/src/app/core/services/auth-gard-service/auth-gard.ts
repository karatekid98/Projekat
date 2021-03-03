import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

const loggedIn = 'isLoggedIn';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean  {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login-page']);
      return false;
    }
  }

  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem(loggedIn)) {
       status = true;
    }
    else {
       status = false;
       }
    return status;
    }
}
