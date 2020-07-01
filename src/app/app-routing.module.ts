import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UsersComponent} from './components/users/users.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FollowingComponent} from './components/following/following.component';
import {FollowedComponent} from './components/followed/followed.component';
import {MainComponent} from './messages/components/main/main.component';
import {AddComponent} from './messages/components/add/add.component';
import {ReceivedComponent} from './messages/components/received/received.component';
import {SendedComponent} from './messages/components/sended/sended.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'settings-profile', component: UserEditComponent},
  {path: 'users/:page', component: UsersComponent},
  {path: 'users', component: UsersComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'following/:id/:page', component: FollowingComponent},
  {path: 'followed/:id/:page', component: FollowedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
