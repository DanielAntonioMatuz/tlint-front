import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {PublicationService} from '../../services/publication.service';
import * as $ from 'jquery';
import {FollowService} from '../../services/follow.service';

@Component({
  selector: 'app-publication-user',
  templateUrl: './publication-user.component.html',
  styleUrls: ['./publication-user.component.css'],
  providers: [UserService, FollowService,PublicationService]

})
export class PublicationUserComponent implements OnInit {

  public title: string;
  public status: string;
  public identity;
  public token;
  public stats;
  public url;
  public publications: Publication[];
  public itemsPerPage;
  public total;
  public page;
  public pages;
  @Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.page = 1;

  }

  ngOnInit(): void {
    console.log('Componente pu-user')
    this.getPublicationUser(this.user, this.page);
  }

  getPublicationUser(user, page, adding = false){
    console.log(user + 'usuario')
    this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
      response => {
        console.log(response);
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if(!adding){
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate( {
              scrollTop: $("body").prop('scrollHeight')
            }, 500);

          }




          if(page > this.pages){
            // this._router.navigate(['/home']);
          }

        } else {
          this.status = 'error';
        }
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  public noMore = false;
  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
      this.noMore = true;
    }

    this.getPublicationUser(this.user, this.page, true);
  }

  refresh(event){
    this.getPublicationUser(this.user,1);
  }

}
