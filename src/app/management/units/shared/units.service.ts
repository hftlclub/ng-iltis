import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Unit } from '../../../shared/models/unit';

@Injectable()
export class UnitsService {

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


}
