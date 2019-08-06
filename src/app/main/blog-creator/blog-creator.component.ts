import { Component, OnInit } from '@angular/core';
// for ngx-editor, type 'npm install ngx-editor --save' in console, ensure your not on offical wifi
import { NgxEditorModule } from 'ngx-editor';
import { DataService } from '../../core/data.service';
import { Blog } from 'src/app/models/blog';
import { LoginService } from 'src/app/core/login.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-blog-creator',
  templateUrl: './blog-creator.component.html',
  styleUrls: ['./blog-creator.component.css']
})
export class BlogCreatorComponent implements OnInit {
  blog = new Blog();
  public Editor = ClassicEditor;
  listOfCategories: string[];
  blogCreated: boolean;
  blogSaved: boolean;
  activeButtons: boolean;

  constructor(private dataservice: DataService,
    public loginService: LoginService,
    private router: Router) { }

  saveBlog() {
    if (confirm('Are you sure you want save your blog?')) {
      this.blog.idUser = this.loginService.getLoggedInUser().userId;
      this.blog.state = 'DRAFT';
      const result = this.dataservice.addBlog(this.blog);
      this.blogSaved = true;
      this.activeButtons = false;
      setTimeout(() => {
        this.blogSaved = false;
        this.resetBlog();
        this.router.navigate(['/profile/', this.loginService.userLoggedIn.userId]);
    }, 2000);
    }
  }

  publishBlog() {
    if (confirm('Are you sure you want to publish your blog?')) {
      this.blog.idUser = this.loginService.getLoggedInUser().userId;
      this.blog.state = 'PENDING';
      this.dataservice.addBlog(this.blog);
      this.blogCreated = true;
      this.activeButtons = false;
      setTimeout(() => {
        this.blogCreated = false;
        this.resetBlog();
        this.router.navigate(['/profile/', this.loginService.userLoggedIn.userId]);
    }, 5000);
    }
  }

  publishBlogAdmin() {
    if (confirm('Are you sure you want to publish your blog?')) {
      this.blog.idUser = this.loginService.getLoggedInUser().userId;
      this.blog.state = 'PUBLISHED';
      this.dataservice.addBlog(this.blog);
      this.activeButtons = false;
      setTimeout(() => {
        this.resetBlog();
        this.router.navigate(['/profile/', this.loginService.userLoggedIn.userId]);
    }, 1000);
    }
  }

  resetBlog() {
    this.blog.title = '';
    this.blog.category = '';
    this.blog.content = '';
  }

  ngOnInit() {
    this.listOfCategories = ['default', 'lifestyle', 'sport', 'technology', 'food'];
    this.activeButtons = true;
    this.blogCreated = false;
    this.blogSaved = false;
  }
}
