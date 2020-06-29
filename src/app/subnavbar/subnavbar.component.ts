import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';


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
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
  }

}
