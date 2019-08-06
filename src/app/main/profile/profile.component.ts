import { LoginService } from 'src/app/core/login.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileId: string;
  displayUser: Users;
  displayCurrentUser: boolean;
  usersFullname: String;

  constructor(private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.profileId = this.route.snapshot.params.id;
    this.checkUser();
  }

  checkUser() {
    if (!isNullOrUndefined(this.loginService.userLoggedIn) && !isNullOrUndefined(this.profileId)) {
      if (this.profileId == this.loginService.getLoggedInUser().userId) {
        this.displayCurrentUser = true;
        this.displayUser = this.loginService.getLoggedInUser();
        return;
      }
    }
    if (this.profileId === undefined && !isNullOrUndefined(this.loginService.userLoggedIn)) {
      this.displayCurrentUser = true;
      this.displayUser = this.loginService.getLoggedInUser();
    } else {
      this.displayCurrentUser = false;
      this.displayUser = null;
    }
  }
}
