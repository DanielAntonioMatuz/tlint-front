import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/users';
import {GLOBAL} from './global';

@Injectable()

export class UserService {
  public url: string;
  public identity;
  public token;

  // tslint:disable-next-line:variable-name
  private stats: any;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // tslint:disable-next-line:typedef variable-name
  register(user:User): Observable<any>{
    let params=JSON.stringify(user);
    let headers= new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'register', params, {headers:headers});
  }

  signup(user, gettoken = null): Observable<any>{
    if (gettoken != null) {
      user.gettoken = gettoken;
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'login', params, {headers: headers})
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined'){
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));

    if(stats != 'undefined'){
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

    if(userId != null){
      return this._http.get(this.url+'counters/'+userId, {headers: headers})
    } else {
      return this._http.get(this.url+'counters', {headers: headers})
    }
  }

  updateUser(user:User):Observable<any>{


    const params = new HttpParams()
      .set('user', JSON.stringify(user));

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .set('Authorization',this.getToken());


    return this._http.put(this.url+'update-user/'+user._id,params,{headers:headers});

  }

  getUsers(page = null): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());
    return this._http.get(this.url+'users/'+page,{headers:headers});
  }

  getUser(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());
    return this._http.get(this.url+'user/'+id,{headers:headers});
  }

}
