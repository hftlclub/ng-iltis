import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Event } from './models/event/event';
import { Transfer } from './models/transfer/transfer';
import { EventFactory } from './models/event/event-factory';
import { TransferFactory } from './models/transfer/transfer-factory';


@Injectable()
export class EventService {

  constructor(@Inject('API_URL') private api, private http: Http) { }

  getAll(): Observable<Event[]> {
    return this.http.get(`${this.api}/events`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(p => EventFactory.fromObj(p)));
  }

  getSingle(id: number): Observable<Event> {
    return this.http.get(`${this.api}/event/${id}`)
      .retry(3)
      .map(res => res.json())
      .map(raw => EventFactory.fromObj(raw));
  }

  getTransfersByEvent(eventId: number): Observable<Transfer[]> {
    return this.http.get(`${this.api}/event/${eventId}/transfers`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(t => TransferFactory.fromObj(t)));
  }

}
