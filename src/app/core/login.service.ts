import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private dataService: DataService, private router: Router) {}

  userLoggedIn: Users;
  token: string;
  accessToken: string;

  async findUser(UserName: string, Password: string) {
    let response: any;
    let error: HttpErrorResponse;
    error = null;
    // this dataservice call can be done async but here it must be done synchronous
    response = <any>await this.dataService.getUserTokenByUsernameAndPassword(UserName, Password).catch(er => (error = er));
    if (error != null) {
      return null;
    }

    localStorage.setItem('currentUser', response);

    const user = <any>await this.dataService.getUserByToken();
    return user;
  }

  checkLoginSuccess(user: Users): boolean {
    let loginSuccess: boolean;

    if (user != null) {
      this.userLoggedIn = user;
      console.log(user.firstName + ' has been logged in.');
      loginSuccess = true;
      this.router.navigate(['/profile']);
    } else if (user == null) {
      console.log('user not found, credentials provided did not match any in db');
      loginSuccess = false;
    }
    console.log(loginSuccess ? 'login success' : 'login failed');
    return loginSuccess;
  }

  logout() {
    this.userLoggedIn = null;
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
    }
  }

  async findUserByToken(): Promise<boolean> {
    const user = <Users>await this.dataService.getUserByToken();
    this.userLoggedIn = user;
    console.log(user.userId + ' is logged in now');
    if (!isNullOrUndefined(user)) {
      return true;
    } else {
      this.userLoggedIn = null;
    }
  }

  getLoggedInUser(): Users {
    return this.userLoggedIn;
  }
}
