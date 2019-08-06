import { Blog } from 'src/app/models/blog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IBlog, IHash } from 'src/app/interfaces';
import { BlogService } from 'src/app/core/blog.service';

@Component({
  providers: [RouterLink],
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  listOfBlogs: Blog[] = [];
  filteredListOfBlogs: Blog[] = [];
  username: string;
  usernameHash: IHash = {};
  categorySelected: string;
  listOfCategories: string[];
  blogIds: any[];

  constructor(private route: ActivatedRoute, private dataService: DataService,
     private routerLink: RouterLink, private blogService: BlogService) {}

  ngOnInit() {
    this.dataService
      .getBlogs()
      .subscribe((blogs: IBlog[]) => (this.filteredListOfBlogs = this.listOfBlogs = blogs.filter(blog => blog.state === 'PUBLISHED')));
    this.listOfCategories = ['any', 'lifestyle', 'sport', 'technology', 'food'];
    this.categorySelected = 'any';
  }

  private changeCategory() {
    this.filterBlogs(this.categorySelected);
  }

  private filterBlogs(filter: String) {
    if (filter === 'any') {
      this.filteredListOfBlogs = this.listOfBlogs;
    } else {
      this.filteredListOfBlogs = this.listOfBlogs.filter(blog => blog.category === filter);
    }
  }
}
