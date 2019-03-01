import { Observable, interval, of } from 'rxjs';
import { Injectable, Inject, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, tap, startWith, mapTo } from 'rxjs/operators';

import { FrontendInfo } from './shared/interfaces/frontend-info';
import { ServerInfo } from './shared/interfaces/server-info';
import { commitId } from '../commit-id';

@Injectable({ providedIn: 'root' })
export class InfoService {
  constructor(private http: HttpClient, @Inject('API_URL') private api) {}

  getServerInfo(): Observable<ServerInfo> {
    return this.http.get<ServerInfo>(`${this.api}/info`).pipe(
      mergeMap(si =>
        interval(1000).pipe(
          startWith(0),
          tap(() => si.time++),
          mapTo(si)
        )
      )
    );
  }

  getFrontendInfo(): Observable<FrontendInfo> {
    return of({
      ngVersion: VERSION.full,
      commit: commitId
    });
  }
}
