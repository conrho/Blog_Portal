import { ProfileComponent } from './profile.component';
import { MainModule } from './../main.module';
import { NgModule } from '@angular/core';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from '../main-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserInboxComponent } from './user-inbox/user-inbox.component';

@NgModule({
  imports: [ CommonModule, MainRoutingModule, BrowserModule, FormsModule
  ],
  declarations: [ ProfileNavComponent, ProfileContentComponent, UserInboxComponent],
  exports: [ProfileNavComponent, ProfileContentComponent, UserInboxComponent]
})
export class ProfileModule { }
