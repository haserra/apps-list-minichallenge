import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { App } from 'src/app/model/app';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppItemComponent implements OnInit {
  @Input() public app: App;


  constructor() {

  }

  ngOnInit() {
  }

}
