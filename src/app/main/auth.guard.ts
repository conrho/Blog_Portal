import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../core/login.service';
import { isNullOrUndefined } from 'util';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  userLoggedIn: Users;

  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

      const token = localStorage.getItem('currentUser');
      if ( !isNullOrUndefined(token) ) {
       const boolean = <any> await this.loginService.findUserByToken();
       return true;
      }
  this.router.navigate(['/login']);
    return false;
  }
}
