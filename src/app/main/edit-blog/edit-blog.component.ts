import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { LoginService } from 'src/app/core/login.service';
import {Users} from 'src/app/models/users';
import {Blog} from 'src/app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { UserType } from 'src/app/user-type.enum';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { IBlog } from 'src/app/interfaces';
import {BlogCreatorComponent} from 'src/app/main/blog-creator/blog-creator.component';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  User: Users;
  id: number;
  blog: Blog;
  userLoggedIn: boolean;
  listOfCategories: string[];
  blogEdited: boolean;
  blogSaved: boolean;


  constructor(private dataService: DataService,
     private loginService: LoginService,
     private route: ActivatedRoute,
     private router: Router) { }

  resetBlog() {
    this.blog.title = '';
    this.blog.category = '';
    this.blog.content = '';
  }

  publishBlog() {
    if (confirm('Are you finished editing your blog?')) {
      this.blog.idUser = this.loginService.getLoggedInUser().userId;
      this.blog.state = 'PENDING';
      const result = this.dataService.editBlog(this.blog);
      this.blogEdited = true;
      setTimeout(() => {
        this.blogEdited = false;
        this.router.navigate(['/profile/', this.loginService.userLoggedIn.userId]);
    }, 3000);
    }
  }

  saveBlog() {
    if (confirm('Are you sure you want save your blog?')) {
      this.blog.idUser = this.loginService.getLoggedInUser().userId;
      this.blog.state = 'DRAFT';
      const result = this.dataService.addBlog(this.blog);
      this.blogSaved = true;
      setTimeout(() => {
        this.blogSaved = false;
        this.resetBlog();
        this.router.navigate(['/profile/', this.loginService.userLoggedIn.userId]);
    }, 2000);
    }
  }


  ngOnInit() {
    this.blogEdited = false;
    this.blogSaved = false;
    this.User = this.loginService.getLoggedInUser();
    this.id = this.route.snapshot.params.id;
    this.dataService.getBlogById(this.id).subscribe((blog: IBlog) => (this.blog = blog));
    this.listOfCategories = ['default', 'lifestyle', 'sport', 'technology', 'food'];
  }
}
