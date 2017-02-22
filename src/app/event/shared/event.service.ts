import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Event, EventFactory } from './models/event';
import { Transfer, TransferFactory } from './models/transfer';
import { Calculation, CalculationFactory } from './models/calculation';
import { EventType, EventTypeFactory } from './models/eventtype';
import { TinyJson } from './tinyjson';

@Injectable()
export class EventService {

  private headers: Headers = new Headers();

  constructor(@Inject('API_URL') private api, private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }

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

  getCalculation(id: number): Observable<Calculation> {
    return this.http.get(`${this.api}/event/${id}/calculation`)
      .retry(3)
      .map(res => res.json())
      .map(raw => CalculationFactory.fromObj(raw));
  }

  getEventTypes(): Observable<EventType[]> {
    return this.http.get(`${this.api}/eventtypes`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(p => EventTypeFactory.fromObj(p)));
  }

  createEvent(event: Event): Observable<Event> {
    return this.http
      .post(`${this.api}/event`, TinyJson.getJSON(event), { headers: this.headers })
      .map(res => res.json())
      .map(raw => EventFactory.fromObj(raw))
      .catch(this.errorHandler);
  }


}
