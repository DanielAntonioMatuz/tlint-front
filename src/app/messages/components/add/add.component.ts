import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public title: string;

  constructor() {
    this.title = 'Enviar mensajes'
  }

  ngOnInit(): void {
  }

}
