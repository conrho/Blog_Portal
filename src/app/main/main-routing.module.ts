import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { BlogCreatorComponent } from './blog-creator/blog-creator.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import {EditBlogComponent} from './edit-blog/edit-blog.component';
import { BlogViewerComponent } from './blog-viewer/blog-viewer.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { ProfileContentComponent } from './profile/profile-content/profile-content.component';
import { RestrictedaccessComponent } from '../restrictedaccess/restrictedaccess.component';

const routes: Routes = [
    {path: 'main', component: BlogListComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'profile-nav', component: ProfileNavComponent, canActivate: [AuthGuard]},
    {path: 'profile-content', component: ProfileContentComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'restricted', component: RestrictedaccessComponent },
    {path: 'signup', component: SignupComponent},
    {path: 'blogcreator', component: BlogCreatorComponent, canActivate: [AuthGuard]},
    {path: 'adminpage', component: AdminpageComponent, canActivate: [AdminGuard]},
    {path: 'blogviewer/:id', component: BlogViewerComponent},
    {path: 'edit-blog/:id', component: EditBlogComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'edit-details', component: EditDetailsComponent, canActivate: [AuthGuard]},
    {path: 'notfound', component: NotfoundComponent},
    {path: '**', component: NotfoundComponent }


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class MainRoutingModule {

    routeToLogin() {
    }

}
