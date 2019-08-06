import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MainRoutingModule } from '../main/main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [NavigationComponent],
  exports: [ NavigationComponent ]
})
export class NavigationModule {
}
