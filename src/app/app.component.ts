import { HealthCheckService } from './core/health-check.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, startWith, pairwise, filter, share } from 'rxjs/operators';
import 'rxjs/add/observable/fromEvent';

import { GlobalService } from './core/global.service';

declare var window: any;

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

  constructor(private gs: GlobalService, private hcs: HealthCheckService) { }

  ngOnInit() {
    this.hcs.startHealthCheck();

    const widthThresh = 767;
    this.gs.mobileMode = Observable.fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(e => e['target'].innerWidth),
      startWith(Infinity, window.innerWidth),
      pairwise(),
      filter(p => p[0] === Infinity || (p[0] <= widthThresh && p[1] > widthThresh) || (p[0] > widthThresh && p[1] <= widthThresh)),
      map(p => p[1] < widthThresh),
      share()
    );
  }

}
