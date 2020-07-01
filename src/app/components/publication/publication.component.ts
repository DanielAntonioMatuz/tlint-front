import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {PublicationService} from '../../services/publication.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
  providers: [UserService, PublicationService, UploadService]
})
export class PublicationComponent implements OnInit {

  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;



  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("","","","",this.identity._id);
  }

  ngOnInit(): void {

  }

  onSubmit(form, $event){

    console.log(this.publication.text);
    this._publicationService.addPublication(this.token, this.publication).subscribe(
    response => {
        if(response.publication){
          //this.publication = response.publication;

          //this._router.navigate(['/']);

          //subir imagen
          if(this.filesToUpload && this.filesToUpload.length){
            this._uploadService.makeFileRequest(this.url+'upload-image-pub/' + response.publication._id, [], this.filesToUpload, this.token, 'image').then((result:any)=> {



              this.publication.file = result.image;
              this.status = 'success';
              form.reset();
              this.sended.emit({send:'true'});
            });
          } else {
            this.status = 'success';
            form.reset();
            this.sended.emit({send:'true'});
          }

        } else {
          this.status = 'error';
          console.log('ERROR');

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

  @Output() sended = new EventEmitter();
  sendPublication(event){
    this.sended.emit({send:'true'});
    console.log(event);
  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log('Archivo:' + this.filesToUpload.length)
  }

}
