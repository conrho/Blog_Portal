import { DataService } from './../../core/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/app/user-type.enum';
import { Component, OnInit } from '@angular/core';
import { MainRoutingModule } from '../main-routing.module';
import { Users } from 'src/app/models/users';
import { TouchSequence } from 'selenium-webdriver';
import { delay } from 'rxjs/internal/operators/delay';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoginService } from 'src/app/core/login.service';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { Blog } from 'src/app/models/blog';
import { IBlog } from 'src/app/interfaces';
import { BlogService } from 'src/app/core/blog.service';

@Component({
  providers: [NavigationComponent],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentials = {
    userName: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private nav: NavigationComponent,
    private dataService: DataService,
    private blogService: BlogService
  ) {}

  user: Users = null;
  loginSuccess: boolean;
  errorStatus: number;
  token: Users;

  async onLoginClick() {
    this.user = null;
    this.errorStatus = null;
    this.loginSuccess = true;
    if (this.userCredentials.userName === '' || this.userCredentials.password === '') {
      alert('Please ensure all fields are filled.');
      return;
    }
    this.user = <any>await this.loginService.findUser(this.userCredentials.userName, this.userCredentials.password);
    // returns the details of the user matching the username & password given
    // checks to see if this.user is a valid user or null
    this.loginSuccess = this.loginService.checkLoginSuccess(this.user);
  }

  ngOnInit() {
    this.loginSuccess = true;
  }
}
