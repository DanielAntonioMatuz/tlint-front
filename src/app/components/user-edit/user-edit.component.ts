import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/users';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import {GLOBAL} from '../../services/global';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url: string;
  public stats;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _UserService: UserService,
    private _uploadService: UploadService,
    private _sanitizer: DomSanitizer
  ) {
    this.title = 'Actualizar tu perfil';
    this.user = this._UserService.getIdentity();
    this.identity = this.user;
    this.token = this._UserService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log(this.user);
    console.log('Componente de editar perfil se ha cargado');
    this.loadPage();
  }

  onSubmit(){
    console.log(this.user);
    this._UserService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          console.log('Numero de archivos:' + this.filesToUpload.length);
          //SUBIDA DE IMAGEN DE USUARIO
          this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any)=> {
                  this.user.image = result.user.image;
                  localStorage.setItem('identity', JSON.stringify(this.user));
              })

        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }

  onSubmitBackground(){
    console.log(this.user);
    this._UserService.updateUser(this.user).subscribe(
      response => {
        if(!response.user){
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          console.log('Numero de archivos:' + this.filesToUpload.length + ' ' + this.identity.imageBackground);
          //SUBIDA DE IMAGEN DE USUARIO
          this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
            .then((result: any)=> {
              this.user.imageBackground = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            })

        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }


  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'];

      this.getUser(id);

      this.getCounters(id);
    })
  }

  getUser(id){
    this._UserService.getUser(id).subscribe(
      response => {

        if(response.user){
          console.log(response);
          this.user = response.user;

        } else {
          this.status = 'error';
        }

      }, error => {

      }
    );
  }

  getCounters(id){
    this._UserService.getCounters(id).subscribe(
      response => {

        this.stats = response;
        console.log(response);

      }, error => {
        console.log(<any>error);
      }
    )
  }



    public sanitizeImage(image: string) {
      return this._sanitizer.bypassSecurityTrustStyle(`url(${this.url + 'get-image-user/' + this.user.imageBackground})`);
    }



}
