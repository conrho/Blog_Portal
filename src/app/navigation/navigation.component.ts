import { LoginService } from 'src/app/core/login.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn = false;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getLoggedInUser();
  }
}
