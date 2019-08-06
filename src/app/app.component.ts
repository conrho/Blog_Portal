import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data.service';
import { LoginService } from './core/login.service';
import { Http } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Users } from './models/users';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Worldline Blogs';
  users: any = {};
  userType: string;

  constructor(private http: Http, public dataService: DataService, public loginService: LoginService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('currentUser');

    if (!isNullOrUndefined(token)) {
      this.loginService.findUserByToken();
    } else {
      this.router.navigate(['/main']);
    }
  }
}
