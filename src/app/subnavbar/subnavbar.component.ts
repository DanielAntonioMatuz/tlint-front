import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.css']
})
export class SubnavbarComponent implements OnInit {

  public identity;
  public url;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
  }



}
