import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/models/users';


@Component({
  selector: 'app-user-inbox',
  templateUrl: './user-inbox.component.html',
  styleUrls: ['./user-inbox.component.css']
})
export class UserInboxComponent implements OnInit {
  @Input() displayUser: Users;
  @Input() displayCurrentUser: boolean;
  @Input() profileId: string;



  constructor() { }

  ngOnInit() {

  }
}
