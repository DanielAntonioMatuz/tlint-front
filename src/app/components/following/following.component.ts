import { Component, OnInit } from '@angular/core';
import {User} from '../../models/users';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FollowService} from '../../services/follow.service';
import {GLOBAL} from '../../services/global';
import {Follow} from '../../models/follow';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [UserService, FollowService]
})
export class FollowingComponent implements OnInit {


  public title: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public users: User[];
  public status: string;
  public url;
  public follows;
  public following;
  public userPageId;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = 'Tus amigos y personas increibles';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('Componente personas ha sido cargado');
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe(params => {

      let user_id = params['id'];

      this.userPageId = user_id;

      let page = +params['page'];
      this.page = page;

      if(!params['page']){
        page = 1;
      }

      if(!page){
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }

      //devolver listado de usuarios
      this.getUser(user_id, page);
    });
  }

  getFollow(user_id, page){
    this._followService.getFollowing(this.token, user_id, page).subscribe(
      response => {
        if(!response.follows){
          this.status = 'error';
        } else {
          console.log(response);
          this.total = response.total;
          this.following = response.follows;
          this.pages = response.pages;
          this.follows = response.users_following;

          console.log(this.follows);

          if(page > this.page){
            this._router.navigate(['/following', this.identity._id, 1]);
          }
        }

      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id){
    this.followUserOver = 0;
  }

  followUser(followed){
    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if(!response.follow){
          this.status = 'error';
        } else {
          this.status = 'success';

          this.follows.push(followed);
        }
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  unfollowUser(followed){
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        var search = this.follows.indexOf(followed);

        if(search != -1){
          this.follows.splice(search, 1);
        }

      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  public user: User;
  getUser(user_id, page){
    this._userService.getUser(user_id).subscribe(
      response => {
        if(response.user){
          this.user = response.user;
          this.getFollow(user_id, page);
        } else {
          this._router.navigate(['/']);
        }

      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

}
