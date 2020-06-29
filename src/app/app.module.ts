import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubnavbarComponent } from './subnavbar/subnavbar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SubmoduleloginComponent } from './components/submodulelogin/submodulelogin.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PublicationComponent } from './components/publication/publication.component';
import  {MomentModule} from 'angular2-moment';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SubnavbarComponent,
    TimelineComponent,
    LoginComponent,
    RegisterComponent,
    SubmoduleloginComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    NavbarComponent,
    PublicationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
