import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/users';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit, DoCheck {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public url;

  constructor(
    // tslint:disable-next-line:variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private _userService: UserService
  ) {
    this.title = 'Registrarse';
    this.url = GLOBAL.url;
    // @ts-ignore
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_USER',
      ''
    );
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(form){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user && response.user._id){
          //console.log(response.user);

          this.status = 'success';
          form.reset();
          this._router.navigate(['/login']);

        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

}
