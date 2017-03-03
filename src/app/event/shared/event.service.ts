import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Event, EventFactory } from '../../shared/models/event';
import { Transfer, TransferFactory } from '../../shared/models/transfer';
import { Transaction, TransactionFactory } from '../../shared/models/transaction';
import { Calculation, CalculationFactory } from '../../shared/models/calculation';
import { EventType, EventTypeFactory } from '../../shared/models/eventtype';
import { Inventory, InventoryFactory } from '../../shared/models/inventory';
import { TinyJson } from '../../shared/tinyjson';

@Injectable()
export class EventService {

  private headers: Headers = new Headers();
  transfersAdded = new EventEmitter<Transfer[]>();
  countFinished = new EventEmitter<Transfer[]>();
  eventUpdated = new EventEmitter<Event>();

  constructor(@Inject('API_URL') private api, private http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }



  getEvents(): Observable<Event[]> {
    return this.http.get(`${this.api}/events`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(p => EventFactory.fromObj(p)));
  }

  getEvent(id: number): Observable<Event> {
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

  getTransactionsByEvent(eventId: number): Observable<Transaction[]> {
    return this.http.get(`${this.api}/event/${eventId}/transactions`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(t => TransactionFactory.fromObj(t)));
  }

  getCalculationForEvent(id: number): Observable<Calculation> {
    return this.http.get(`${this.api}/event/${id}/calculation`)
      .retry(3)
      .map(res => res.json())
      .map(raw => CalculationFactory.fromObj(raw));
  }

  getInventoryForEvent(id: number): Observable<Inventory[]> {
    return this.http.get(`${this.api}/event/${id}/inventory`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(inv => InventoryFactory.fromObj(inv)));
  }

  getEventTypes(uiMode?: string): Observable<EventType[]> {
    let data$ = this.http.get(`${this.api}/eventtypes`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(p => EventTypeFactory.fromObj(p)));

    if (uiMode) {
      data$ = data$.map(ets => ets.filter(e => e.uiMode === uiMode));
    }

    return data$;
  }

  createEvent(event: Event): Observable<Event> {
    return this.http
      .post(`${this.api}/event`, TinyJson.getJSON(event), { headers: this.headers })
      .map(res => res.json())
      .map(raw => EventFactory.fromObj(raw))
      .catch(this.errorHandler);
  }

  updateEvent(eventId: number, event: Event): Observable<any> {
    return this.http
      .put(`${this.api}/event/${eventId}`, TinyJson.getJSON(event), { headers: this.headers })
      .map(res => {})
      .catch(this.errorHandler);
  }

  createTransfer(direction: string, destination: string, eventId: number, data: any): Observable<Transfer[]> {
    direction = (direction === 'in') ? 'in' : 'out';
    destination = (destination === 'counter') ? 'counter' : 'storage';

    return this.http
      .post(`${this.api}/event/${eventId}/transfers/${destination}/${direction}`, JSON.stringify(data), { headers: this.headers })
      .map(res => res.json())
      .map(raw => raw.map(t => TransferFactory.fromObj(t)))
      .catch(this.errorHandler);
  }

  transmitCount(destination: string, eventId: number, items: any[]): Observable<Transfer[]> {
    destination = (destination === 'counter') ? 'counter' : 'storage';

    return this.http
      .post(`${this.api}/event/${eventId}/transfers/${destination}/count`, JSON.stringify(items), { headers: this.headers })
      .map(res => res.json())
      .map(raw => raw.map(t => TransferFactory.fromObj(t)))
      .catch(this.errorHandler);
  }

  checkPermission(): Observable<any> {
    return this.http.get(`${this.api}/event/checkpermission`)
      .retry(3)
      .map(res => res.json());
  }




}
