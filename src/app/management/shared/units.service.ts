import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Unit } from '../../shared/models/unit';

@Injectable({ providedIn: 'root' })
export class UnitsService {
  unitListChanged = new EventEmitter<any>();

  constructor(private http: HttpClient, @Inject('API_URL') private api) {}

  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.api}/units`).pipe(
      retry(3),
      map(units => units.filter(u => u.full))
    );
  }

  getSingle(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.api}/unit/${id}`).pipe(retry(3));
  }

  delete(unitId: number): Observable<any> {
    return this.http.delete(`${this.api}/unit/${unitId}`);
  }

  create(unit: Unit): Observable<any> {
    return this.http.post(`${this.api}/unit`, unit);
  }

  update(unitId: number, unit: Unit): Observable<any> {
    return this.http.put(`${this.api}/unit/${unitId}`, unit);
  }
}
