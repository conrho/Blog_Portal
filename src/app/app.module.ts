import { ProfileModule } from './main/profile/profile.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { NavigationModule } from './navigation/navigation.module';
import { AppRoutingModule} from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MainRoutingModule } from './main/main-routing.module';
import { HttpModule } from '@angular/http';
import { NgxEditorModule } from 'ngx-editor';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatSortModule, MatTableModule, MatCardModule, MatProgressSpinnerModule,
  MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    NavigationModule,
    AppRoutingModule,
    CoreModule,
    MainRoutingModule,
    HttpModule,
    AppRoutingModule,
    NgxEditorModule,
    ProfileModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

