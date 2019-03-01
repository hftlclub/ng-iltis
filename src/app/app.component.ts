import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map, startWith, pairwise, filter, share } from 'rxjs/operators';

import { GlobalService } from './core/global.service';
import { HealthCheckService } from './core/health-check.service';

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

  constructor(private gs: GlobalService, private hcs: HealthCheckService) {}

  ngOnInit() {
    this.hcs.startHealthCheck();

    const widthThresh = 767;
    this.gs.mobileMode = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(() => window.innerWidth),
      startWith(Infinity, window.innerWidth),
      pairwise(),
      filter(
        p =>
          p[0] === Infinity ||
          (p[0] <= widthThresh && p[1] > widthThresh) ||
          (p[0] > widthThresh && p[1] <= widthThresh)
      ),
      map(p => p[1] < widthThresh),
      share()
    );
  }
}
