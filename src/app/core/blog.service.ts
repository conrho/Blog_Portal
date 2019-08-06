import { IComment, IRating } from './../interfaces';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { IBlog } from '../interfaces';
import { forEach } from '@angular/router/src/utils/collection';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class BlogService {
  constructor(private dataService: DataService) {}

  // fetches the ids for every blog the user has created.
  private async getBlogIdsByUserId(id: any): Promise<any[]> {
    let blogIds: any[];
    await this.dataService
      .getBlogIdsByUserId(id)
      .then((ids: any[]) => (blogIds = ids))
      .catch(error => console.log(error));
    return blogIds;
  }

  async deleteBlog(id: any) {
    console.log('deleting blog with id: ' + id);

    // deletes a blog
    this.dataService.deleteBlogById(id).subscribe(res => console.log(res), error => console.log(error));

  }

  async deleteBlogsOfUser(id: any) {
    const blogIds = await this.getBlogIdsByUserId(id);
    console.log(blogIds);
    if (blogIds === undefined) {
      console.log('no blogs found for user with id ' + id);
      return;
    }
    for (const blogId of blogIds) {
      this.dataService.deleteBlogById(blogId).subscribe(res => console.log(res), error => console.log(error));
    }
  }

  async getCommentIdsByBlogId(id: any): Promise<any[]> {
    const commentIds: any[] = [];
    let comments: IComment[];
    await this.dataService
      .getCommentsByBlogIdPromise(id)
      .then((res: IComment[]) => (comments = res))
      .catch(error => console.log(error));

    if (comments === undefined) {
      console.log('no comments found for blog with id ' + id);
      return;
    }
    for (const comment of comments) {
      commentIds.push(comment.id);
    }
    return commentIds;
  }

  async getRateIdsByBlogId(id: any): Promise<any[]> {
    const rateIds: any[] = [];
    let rates: IRating[];
    await this.dataService
      .getRatesByBlogIdPromise(id)
      .then((res: IRating[]) => (rates = res))
      .catch(error => console.log(error));

    if (rates === undefined) {
      console.log('no ratings found for blog with id ' + id);
      return;
    }
    for (const rate of rates) {
      rateIds.push(rate.id);
    }
    return rateIds;
  }
}
