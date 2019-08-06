import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from 'src/app/core/data.service';
import { IUser } from 'src/app/interfaces';
import { IBlog } from 'src/app/interfaces';
import { LoginService } from 'src/app/core/login.service';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/core/user.service';
import { BlogService } from 'src/app/core/blog.service';
import { Blog } from 'src/app/models/blog';
import { PagerService } from 'src/app/pager.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})

export class AdminpageComponent implements OnInit {
  user = new Users();
  users: any = {};
  listOfUsers: IUser[];
  userLoggedIn: Users;
  userType: string;
  filteredListOfBlogs:  Blog[] = [];
  pages: any[];
  pageSize = 3;
  pager: any = {};

  constructor(
    private http: Http,
    public dataService: DataService,
    public loginService: LoginService,
    private userService: UserService,
    private blogService: BlogService,
    private pagerService: PagerService
    ) { }

changeUserType(userType: string, user: Users) {
  user.userType = userType;
  this.dataService.editUser(user);
}

approveBlog(blogState: string, blog: Blog) {
  blog.state = blogState;
  this.dataService.editBlog(blog);
  setTimeout(() => {
    this.reloadPendingBlogs();
  }, 500);
}

deleteUser (id: any) {
  this.userService.deleteUser(id);
  setTimeout(() => {
  this.reloadUsers();
}, 500);

}

reloadUsers() {
  this.dataService.getAllUsers().subscribe((users:  IUser[]) => this.listOfUsers =  users);
}

reloadPendingBlogs() {
  this.dataService
  .getBlogs()
  .subscribe((blogs: IBlog[]) =>
  (this.filteredListOfBlogs = blogs
    .filter(blog => blog.state.toLowerCase() === 'pending')));
}

setPage(pageNumber: number) {
  this.pager = this.pagerService.getPager(this.listOfUsers.length, pageNumber, this.pageSize);
  this.pages = this.listOfUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

deleteBlog (id: any) {
  this.blogService.deleteBlog(id);
  console.log('deleted blog with id of ' + id);
  setTimeout(() => {
    this.reloadPendingBlogs();
  }, 500);
}

onSignupClick() {
  this.dataService.addUsers(this.user);
  this.user = new Users();
  setTimeout(() => {this.reloadUsers(); }, 250);
}
ngOnInit() {
  this.userLoggedIn = this.loginService.getLoggedInUser();
  this.dataService.getAllUsers().subscribe((users:  IUser[]) => this.listOfUsers =  users);
  setTimeout(() => {
    this.setPage(1);
  }, 500);
  this.dataService
  .getBlogs()
  .subscribe((blogs: IBlog[]) =>
  (this.filteredListOfBlogs = blogs
    .filter(blog => blog.state.toLowerCase() === 'pending')));
  }
}
