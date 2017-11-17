import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { InfoService } from '../info.service';
import { FrontendInfo } from '../shared/interfaces/frontend-info';
import { ServerInfo } from '../shared/interfaces/server-info';

@Component({
  selector: 'il-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  frontendInfo$: Observable<FrontendInfo>;
  serverInfo$: Observable<ServerInfo>;

  constructor(private is: InfoService) { }

  ngOnInit() {
    this.frontendInfo$ = this.is.getFrontendInfo();
    this.serverInfo$ = this.is.getServerInfo();
  }

}
