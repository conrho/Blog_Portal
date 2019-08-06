import { Rating } from './../models/rating';
import { Comment } from './../models/comment';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser, IBlog, IComment } from './../interfaces';
import { Injectable } from '@angular/core';
import { Headers, HttpModule, Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Blog } from '../models/blog';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class DataService {
  baseUrl = 'http://localhost:5000/wlblog/api/';

  constructor(private http: Http) {}

  getHeaders(): Headers {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  getTokenHeader(): Headers {
    const headers = new Headers();
    headers.set('token', localStorage.getItem('currentUser'));
    return headers;
  }

  // POST

  addBlog(blog:  IBlog) {
    return this.http.post(this.baseUrl + 'blogs',  blog, {headers :  this.getHeaders()}).subscribe(res => console.log(res.status
    ));
  }

  addRating(rate: Rating) {
    return this.http.post(this.baseUrl + 'rates', rate, { headers: this.getHeaders() }).subscribe(res => console.log(res.status));
  }

  addUsers(user: IUser) {
    return this.http.post(this.baseUrl + 'users', user, { headers: this.getHeaders() }).subscribe(res => console.log(res.status));
  }

  async addComment(comment: IComment) {
    return this.http.post(this.baseUrl + 'comments', comment, { headers: this.getHeaders() }).toPromise();
  }

  // PUT

  editBlog(blog: IBlog) {
    return this.http.put(this.baseUrl + 'blogs', blog, { headers: this.getHeaders() }).subscribe(res => console.log(res.status));
  }

  editUser(user: Users) {
    return this.http.put(this.baseUrl + 'users', user, { headers: this.getHeaders() }).subscribe(res => console.log(res.status));
  }

  // GET

  getUserByUsernameAndPassword(username: String, password: String): Promise<any> {
    return this.http
      .get(this.baseUrl + 'users/' + username + '/' + password)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res)
      )
      .toPromise();
  }

  getUserTokenByUsernameAndPassword(username: string, password: string): Promise<any> {
    return this.http
      .get(this.baseUrl + 'users/' + username + '/' + password)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res.text())
      )
      .toPromise();
  }

  getUserByToken() {
    return this.http
      .get(this.baseUrl + 'user/', { headers: this.getTokenHeader() })
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res.json())
      )
      .toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getBlogs(): Observable<IBlog[]> {
    return this.http.get(this.baseUrl + 'blogs').pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get(this.baseUrl + 'users', { headers: this.getTokenHeader() }).pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  getUserById(username: String): Promise<any> {
    return this.http
      .get(this.baseUrl + 'users/' + username)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res)
      )
      .toPromise();
  }

  getBlogIdsByUserId(id: any): Promise<any[]> {
    return this.http
      .get(this.baseUrl + 'blogs/id/user/' + id)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res.json())
      )
      .toPromise();
  }

  getCommentsByBlogId(id: any): Observable<Comment[]> {
    return this.http.get(this.baseUrl + 'comments/blog/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  getCommentsByBlogIdPromise(id: any): Promise<Comment[]> {
    return this.http
      .get(this.baseUrl + 'comments/blog/' + id)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res.json())
      )
      .toPromise();
  }

  getRatesByBlogId(id: any): Observable<any[]> {
    return this.http.get(this.baseUrl + 'rates/blog/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  getRatesByBlogIdPromise(id: any): Promise<any[]> {
    return this.http
      .get(this.baseUrl + 'rates/blog/' + id)
      .pipe(
        catchError(error => this.handleError(error)),
        map(res => res.json())
      )
      .toPromise();
  }

  getAvgRatesByBlogId(id: any): Observable<any[]> {
    return this.http.get(this.baseUrl + 'rates/avg/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  getBlogById(id: any): Observable<IBlog> {
    return this.http.get(this.baseUrl + 'blogs/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => res.json())
    );
  }

  // DELETE

  // TODO - add token authentication to delete methods
  deleteRatesByUserId(username: any) {
    return this.http.delete(this.baseUrl + 'rates/user/' + username, { headers: this.getTokenHeader() }).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

  deleteCommentsByUserId(username: any) {
    return this.http.delete(this.baseUrl + 'comments/user/' + username).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

  deleteUserById(id: any) {
    return this.http.delete(this.baseUrl + 'users/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

  deleteBlogById(id: any) {
    return this.http.delete(this.baseUrl + 'blogs/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

  deleteCommentById(id: any) {
    return this.http.delete(this.baseUrl + 'comments/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

  deleteRatingById(id: any) {
    return this.http.delete(this.baseUrl + 'rates/' + id).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res.json()))
    );
  }

}
