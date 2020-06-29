import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public title: string;
  public identity;
  public url: string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'tlint';
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }
}
