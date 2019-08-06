import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { BlogService } from './blog.service';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private dataService: DataService, private blogService: BlogService) {}

  async deleteUser(id: any) {
    console.log('deleting user with id: ' + id);

    // deletes the user record
    this.dataService.deleteUserById(id).subscribe(res => console.log(res), error => console.log(error));

    // deletes all blog records where the 'userId' equals 'id'
    // also deletes all comment & rate records where the blogId is the same as the blogs being deleted
    this.blogService.deleteBlogsOfUser(id);

    // deletes all comment records where 'userId' equals 'id'
    this.dataService.deleteCommentsByUserId(id).subscribe(res => console.log(res), error => console.log(error));

    // deletes all rating records where 'userId' equals 'id'
    this.dataService.deleteRatesByUserId(id).subscribe(res => console.log(res), error => console.log(error));
  }
}
