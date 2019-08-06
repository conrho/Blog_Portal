import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../models/blog';
import { IHash, IBlog } from '../../../interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../../core/data.service';
import { BlogService } from '../../../core/blog.service';
import { LoginService } from '../../../core/login.service';
import { Users } from '../../../models/users';

@Component({
  providers: [RouterLink],
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {
  @Input() displayUser: Users;
  @Input() displayCurrentUser: boolean;
  @Input() profileId: string;

  listOfBlogs: Blog[] = [];
  filteredListOfBlogs: Blog[] = [];
  username: string;
  usernameHash: IHash = {};
  categorySelected: string;
  listOfCategories: string[];
  blogIds: any[];
  blogDeleted: boolean;

  constructor(
    private dataService: DataService,
    private blogService: BlogService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getLoggedInUser();
    this.blogDeleted = false;
    this.reloadProfile();
  }

  private changeCategory() {
    this.filterBlogs(this.categorySelected);
  }

  deleteBlog (id: any) {
    this.blogService.deleteBlog(id);
    console.log('deleted blog with id of ' + id);
    this.blogDeleted = true;
    setTimeout(() => {
      this.blogDeleted = false;
      this.reloadProfile();
    }, 1500);
  }

  reloadProfile() {
    if (this.displayCurrentUser) {
      this.dataService
        .getBlogs()
        .subscribe((blogs: IBlog[]) =>
        (this.filteredListOfBlogs = this.listOfBlogs = blogs.filter(blog => blog.idUser === this.displayUser.userId)));
      this.listOfCategories = ['Any', 'Draft', 'Pending', 'Published'];
    } else {
      this.dataService
      .getBlogs()
      .subscribe((blogs: IBlog[]) =>
      (this.filteredListOfBlogs = this.listOfBlogs = blogs
        .filter(blog => blog.idUser === this.profileId && blog.state.toLowerCase() === 'published')));
    }
    this.categorySelected = 'Any';
  }


  private filterBlogs(filter: String) {
    if (filter === 'Any') {
      this.filteredListOfBlogs = this.listOfBlogs;
    } else {
      this.filteredListOfBlogs = this.listOfBlogs.filter(blog => blog.state.toLowerCase() === filter.toLowerCase());
    }
  }
}
