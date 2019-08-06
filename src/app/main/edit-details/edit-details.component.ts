import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { LoginService } from 'src/app/core/login.service';
import {Users} from 'src/app/models/users';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { UserType } from 'src/app/user-type.enum';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  User: Users;
  detailsChanged: boolean;

  constructor(private dataservice: DataService, private loginService: LoginService, private router: Router) {
  }

  editDetails() {
    this.dataservice.editUser(this.User);
    this.detailsChanged = true;
    setTimeout(() => {
      this.detailsChanged = false;
      this.router.navigate(['/profile']);
 }, 3000);
  }

  ngOnInit() {
    this.detailsChanged = false;
    this.User = this.loginService.getLoggedInUser();
    this.loginService.getLoggedInUser();
  }
}
