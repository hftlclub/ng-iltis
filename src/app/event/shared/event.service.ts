import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, retry, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Permission } from '../../shared/interfaces/permission';
import { Costs } from '../../shared/interfaces/costs';
import { Event, EventFactory } from '../../shared/models/event';
import { Transfer, TransferFactory } from '../../shared/models/transfer';
import { Transaction, TransactionFactory } from '../../shared/models/transaction';
import { Calculation, CalculationFactory } from '../../shared/models/calculation';
import { EventType, EventTypeFactory } from '../../shared/models/eventtype';
import { Inventory, InventoryFactory } from '../../shared/models/inventory';
import { TinyJson } from '../../shared/tinyjson';

@Injectable()
export class EventService {

  transfersAdded = new EventEmitter<Transfer[]>();
  countFinished = new EventEmitter<Transfer[]>();
  eventUpdated = new EventEmitter<Event>();
  eventClosed = new EventEmitter<number>(); // emits eventId

  constructor(@Inject('API_URL') private api, private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    return Observable.throw(error);
  }


  getEvents(): Observable<Event[]> {
    return this.http.get<any[]>(`${this.api}/events`)
      .pipe(
        retry(3),
        map(raw => raw.map(p => EventFactory.fromObj(p)))
      );
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get(`${this.api}/event/${id}`)
      .pipe(
        retry(3),
        map(raw => EventFactory.fromObj(raw))
      );
  }

  getTransfersByEvent(eventId: number): Observable<Transfer[]> {
    return this.http.get<any[]>(`${this.api}/event/${eventId}/transfers`)
    .pipe(
      retry(3),
      map(raw => raw.map(t => TransferFactory.fromObj(t)))
    );
  }

  getTransactionsByEvent(eventId: number): Observable<Transaction[]> {
    return this.http.get<any[]>(`${this.api}/event/${eventId}/transactions`)
    .pipe(
      retry(3),
      map(raw => raw.map(t => TransactionFactory.fromObj(t)))
    );
  }

  getCalculationForEvent(id: number): Observable<Calculation> {
    return this.http.get(`${this.api}/event/${id}/calculation`)
    .pipe(
      retry(3),
      map(raw => CalculationFactory.fromObj(raw))
    );
  }

  getCostsForEvent(id: number): Observable<Costs> {
    return this.http.get<Costs>(`${this.api}/event/${id}/costs`)
    .pipe(retry(3));
  }

  getInventoryForEvent(id: number): Observable<Inventory[]> {
    return this.http.get<any[]>(`${this.api}/event/${id}/inventory`)
    .pipe(
      retry(3),
      map(raw => raw.map(inv => InventoryFactory.fromObj(inv)))
    );
  }

  getEventTypes(uiMode?: string): Observable<EventType[]> {
    let data$ = this.http.get<any[]>(`${this.api}/eventtypes`)
    .pipe(
      retry(3),
      map(raw => raw.map(p => EventTypeFactory.fromObj(p)))
    );

    if (uiMode) {
      data$ = data$.pipe(
        map(ets => ets.filter(e => e.uiMode === uiMode))
      );
    }

    return data$;
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post(`${this.api}/event`, event)
      .pipe(
        retry(3),
        map(raw => EventFactory.fromObj(raw)),
        catchError(this.errorHandler)
      );
  }

  updateEvent(eventId: number, event: Event): Observable<any> {
    return this.http.put(`${this.api}/event/${eventId}`, event)
      .pipe(
        map(res => {}),
        catchError(this.errorHandler)
      );
    }

  closeEvent(eventId: number): Observable<any> {
    return this.http.post(`${this.api}/event/${eventId}/close`, null)
      .pipe(
        map(res => {}),
        catchError(this.errorHandler)
      );
    }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.api}/event/${eventId}`)
      .pipe(
        map(res => {}),
        catchError(this.errorHandler)
      );
    }

  createTransfer(direction: string, destination: string, eventId: number, data: any): Observable<Transfer[]> {
    direction = (direction === 'in') ? 'in' : 'out';
    destination = (destination === 'counter') ? 'counter' : 'storage';

    return this.http.post<any[]>(`${this.api}/event/${eventId}/transfers/${destination}/${direction}`, data)
      .pipe(
        map(raw => raw.map(t => TransferFactory.fromObj(t))),
        catchError(this.errorHandler)
      );
  }

  transmitCount(destination: string, eventId: number, items: any[]): Observable<Transfer[]> {
    destination = (destination === 'counter') ? 'counter' : 'storage';

    return this.http.post<any[]>(`${this.api}/event/${eventId}/transfers/${destination}/count`, items)
      .pipe(
        map(raw => raw.map(t => TransferFactory.fromObj(t))),
        catchError(this.errorHandler)
      );
  }

  checkPermission(): Observable<Permission> {
    return this.http.get<Permission>(`${this.api}/event/checkpermission`)
      .pipe(retry(3));
  }

  getInventory(eventId: number): Observable<Inventory[]> {
    return this.http.get<any[]>(`${this.api}/inventory/${eventId}`)
      .pipe(
        retry(3),
        map(raw => raw.map(inv => InventoryFactory.fromObj(inv)))
      );
  }




}
