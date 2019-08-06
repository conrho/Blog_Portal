import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../core/login.service';
import { Users } from '../../../models/users';
import { DataService } from 'src/app/core/data.service';
import { Router } from '@angular/router';
import { IBlog } from 'src/app/interfaces';
import { Blog } from 'src/app/models/blog';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {
  @Input() userLoggedIn: Users;
  @Input() displayCurrentUser: boolean;
  @Input() profileId: string;
  @Input() displayUser: Users;

  oldPassword = '';
  password1 = '';
  password2 = '';
  passwordChanged: boolean;
  listOfBlogs: Blog[] = [];
  filteredListOfBlogs: Blog[] = [];
  listOfCategories: string[];
  blogIds: any[];
  categorySelected: string;
  id: number;
  UsersRating: Rating;
  averageRating: number;
  comments: Comment[];

  constructor (
    private dataService: DataService,
    private loginService: LoginService
    ) { }

editDetails() {
      this.changePassword();
      this.dataService.editUser(this.userLoggedIn);
}

changePassword() {
  if (this.oldPassword === this.userLoggedIn.password ) {
    if (this.password1 === this.password2 && this.oldPassword !== this.password1) {
      this.userLoggedIn.password = this.password1;
      this.passwordChanged = true;
      setTimeout(() => {
        this.passwordChanged = false;
        window.location.reload();
   }, 3000);
    } else {
      alert('Your passwords either do not match or your password is unchanged');
    }
  } else {
    alert('Your orignal password was not valid');
  }
}

  ngOnInit() {
    this.passwordChanged = false;
    this.loginService.getLoggedInUser();
    if (this.userLoggedIn) {
      this.dataService
        .getBlogs()
        .subscribe((blogs: IBlog[]) =>
        (this.filteredListOfBlogs = this.listOfBlogs = blogs.filter(
          blog => blog.idUser === this.userLoggedIn.userId && blog.state.toLowerCase() === 'published')));
    } else {
      this.dataService
      .getBlogs()
      .subscribe((blogs: IBlog[]) =>
      (this.filteredListOfBlogs = this.listOfBlogs = blogs
        .filter(blog => blog.idUser === this.profileId && blog.state.toLowerCase() === 'published')));
    }
    this.categorySelected = 'Any';
    this.UsersRating = new Rating(0, this.id, this.loginService.getLoggedInUser().userId);
    this.dataService
      .getAvgRatesByBlogId(this.id)
      .subscribe((avgRate: any) => (this.UsersRating.rate = this.averageRating = avgRate), () => console.log('no average rating found'));
  }


  }

