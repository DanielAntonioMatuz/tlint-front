import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/users';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit, DoCheck {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Iniciar sesion | tlint';
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

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    console.log('Componente de login cargando...');
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  onSubmit(){
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        console.log(this.identity);

        if(!this.identity || !this.identity._id){
          this.status = 'error';
        } else {

          //Persistir datos del usuario
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir el token
          this.getToken();
        }

        this.status = 'success';
      }, error => {
          var errorMessage = <any>error;
          console.log(errorMessage);

          if(errorMessage != null){
            this.status = 'error';
          }
      }
    );
  }

  getToken(){
    this._userService.signup(this.user, 'true').subscribe(
      response => {
        this.token = response.token;

        console.log(this.token);

        if(this.token.length <= 0){
          this.status = 'error';
        } else {
          //Persistir datos del usuario
          localStorage.setItem('token', JSON.stringify(this.token));
          //Conseguir los contadores o estadisticas del usuario
          this.getCounters();

        }

        this.status = 'success';
      }, error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
