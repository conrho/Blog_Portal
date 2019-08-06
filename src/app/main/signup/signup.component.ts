import { Component, OnInit, Input } from '@angular/core';
import { Users } from '../../models/users';
import { DataService } from '../../core/data.service';

import { UserType } from 'src/app/user-type.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new Users();

  constructor(private dataservice: DataService) {}

  ngOnInit() {}

  onSignupClick() {
    this.user.userType = "NORMAL";
    this.dataservice.addUsers(this.user);
    this.user = new Users();
  }
}
