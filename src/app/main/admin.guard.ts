import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../core/login.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const token = localStorage.getItem('currentUser');
      if ( !isNullOrUndefined(token) ) {
       const boolean = <any> await this.loginService.findUserByToken();
      }
      // tslint:disable-next-line:max-line-length
      console.log(this.loginService.userLoggedIn.userType);
      if (this.loginService.userLoggedIn.userType !== 'NORMAL') {
        return true;
      } else {
    this.router.navigate(['/restricted']);
    return false;
  }
  }
 }

