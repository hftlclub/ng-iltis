import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { Unit } from '../../../shared/models/unit';

@Injectable()
export class UnitsService {

  unitListChanged = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.api}/units`)
      .retry(3)
      .map(units => units.filter(u => u.full))
  }

  getSingle(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.api}/unit/${id}`)
      .retry(3)
  }

  delete(id: number): Observable<any> {
    return Observable.of('...').delay(2000);
  }

  create(unit: Unit): Observable<any> {
    console.log('Create unit', unit);
    return Observable.of('...').delay(2000);
  }

  update(unitId: number, unit: Unit): Observable<any> {
    console.log('Update unit ID', unitId, ':', unit);
    return Observable.of('...').delay(2000);
  }


}
