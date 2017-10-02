import { FrontendInfo } from './shared/frontend-info';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/timer';

import { ServerInfo } from './shared/server-info';
import { commitId } from '../commit-id';

@Injectable()
export class InfoService {

  constructor(private http: HttpClient, @Inject('API_URL') private api) { }

  getServerInfo(): Observable<ServerInfo> {
    return this.http.get<ServerInfo>(`${this.api}/info`)
      .mergeMap(si => Observable.interval(1000).startWith(0).do(() => si.time++).mapTo(si));
  }

  getFrontendInfo(): Observable<FrontendInfo> {
    return Observable.of({
      ngVersion: VERSION.full,
      commit: commitId
    } as FrontendInfo);
  }

}
