import { delay } from 'rxjs/internal/operators/delay';
import { LoginService } from 'src/app/core/login.service';
import { BlogService } from './../../core/blog.service';
import { IBlog } from 'src/app/interfaces';
import { Blog } from 'src/app/models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data.service';
import { Comment } from 'src/app/models/comment';
import { isNullOrUndefined } from 'util';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-blog-viewer',
  templateUrl: './blog-viewer.component.html',
  styleUrls: ['./blog-viewer.component.css']
})
export class BlogViewerComponent implements OnInit {
  id: number;
  blog: Blog = null;
  comment: Comment = null;
  comments: Comment[];
  newComment = new Comment();
  userLoggedIn: boolean;
  enableComments: boolean;
  UsersRating: Rating;
  averageRating: number;
  canManageBlog: boolean;
  canDeleteComments: boolean;
  newRating: boolean = false;
  blogDeleted: boolean;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private blogService: BlogService,
    public loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.enableComments = false;
    this.canManageBlog = false;
    this.blogDeleted = false;
    this.id = this.route.snapshot.params.id;

    this.dataService.getBlogById(this.id).subscribe((blog: IBlog) => (this.blog = blog));

    // incase a user refreshes the page, this waits 3 seconds for the app.component to call
    // loginService to get the logged in user again.
    setTimeout(() => {
      if (this.blog == null) {
        this.router.navigate(['/notfound']);
      }
      if (this.loginService.getLoggedInUser() === undefined || this.loginService.getLoggedInUser() === null) {
        this.userLoggedIn = false;
      } else {
        this.userLoggedIn = true;
        this.canManage();
      }
      this.enableComments = this.blog.state === 'PUBLISHED' && this.userLoggedIn ? true : false;
      if (this.enableComments) {
        this.getAvgRating();
        this.getComments();
        this.canDeleteComment();
      }
    }, 200);

  }

  async submitComment() {
    this.newComment.blogId = this.blog.id;
    this.newComment.idUser = this.loginService.getLoggedInUser().userId;

    await this.dataService.addComment(this.newComment).then(() => console.log('comment added'));

    this.newComment = new Comment();
    this.getComments();
  }

  deleteBlog(id: any) {
    this.blogService.deleteBlog(id);
    console.log('deleted blog with id of ' + id);
    this.blogDeleted = true;
    setTimeout(() => {
      this.blogDeleted = false;
      this.router.navigate(['/profile']);
    }, 2000);
  }

  deleteComment(comment: Comment) {
    this.dataService.deleteCommentById(comment.id).subscribe(res => console.log(res), error => console.log(error));
    this.comments.splice(this.comments.indexOf(comment), 1);
  }

  getAvgRating() {
    this.UsersRating = new Rating(0, this.id, this.loginService.getLoggedInUser().userId);
    this.dataService
      .getAvgRatesByBlogId(this.id)
      .subscribe((avgRate: any) => (this.UsersRating.rate = this.averageRating = avgRate), () => console.log('no average rating found'));
  }

  async getComments() {
    this.dataService
      .getCommentsByBlogId(this.id)
      .subscribe((comments: Comment[]) => (this.comments = comments), () => console.log('no comments found.'));
  }

  submitRating(rate: number): void {
    this.UsersRating = new Rating(rate, this.id, this.loginService.getLoggedInUser().userId);
    this.newRating = true;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.newRating) {
      this.dataService.addRating(this.UsersRating);
    }
  }

  canManage() {
    if (
      this.userLoggedIn === true &&
      (this.loginService.getLoggedInUser().userType === 'SUPERADMINISTRATOR'
       || this.loginService.getLoggedInUser().userId === this.blog.idUser)
    ) {
      this.canManageBlog = true;
    } else {
      this.canManageBlog = false;
    }
  }

  canDeleteComment() {
    if (
      this.userLoggedIn === true && (this.loginService.getLoggedInUser().userType !== 'NORMAL')
    ) {
      this.canDeleteComments = true;
    } else {
      this.canDeleteComments = false;
    }
  }
}
