import { ProfileModule } from './profile/profile.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCreatorComponent } from './blog-creator/blog-creator.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { MainRoutingModule} from './main-routing.module';
import { FormsModule } from '@angular/forms';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ProfileComponent } from './profile/profile.component';
import { RestrictedaccessComponent } from '../restrictedaccess/restrictedaccess.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginationComponent } from './pagination/pagination.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
    imports: [CommonModule, MainRoutingModule, BrowserModule, FormsModule, NgxEditorModule,
      ProfileModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatTabsModule, CKEditorModule],
    declarations: [MainComponent, BlogListComponent, ProfileComponent,
         BlogCreatorComponent, LoginComponent, SignupComponent,
        BlogViewerComponent, AdminpageComponent, EditDetailsComponent, RestrictedaccessComponent, EditBlogComponent, PaginationComponent],
    exports: [MainComponent]
})
export class MainModule {
 }

 const appRoutes = [
    { path: './main/blog-list/blog-list', component: BlogListComponent}
  ];
