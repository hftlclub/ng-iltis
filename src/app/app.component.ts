import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';

import { GlobalService } from './core/global.service';

@Component({
  selector: 'il-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  notificationOptions = {
    position: ['top', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private gs: GlobalService) { }

  ngOnInit() {
    const widthThresh = 767;
    this.gs.mobileMode = Observable.fromEvent(window, 'resize')
      .debounceTime(300)
      .map(e => e['target'].innerWidth)
      .startWith(Infinity, window.innerWidth)
      .pairwise()
      .filter(p => p[0] === Infinity || (p[0] <= widthThresh && p[1] > widthThresh) || (p[0] > widthThresh && p[1] <= widthThresh))
      .map(p => p[1] < widthThresh)
      .share();
  }

}
