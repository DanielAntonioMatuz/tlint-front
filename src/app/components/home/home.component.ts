import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'tlint - algo por descubrir';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('Componente Home/timeline cargado');
  }



}
