import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { SizeType } from '../../shared/models/sizetype';

@Injectable()
export class SizesService {

  sizeTypeListChanged = new EventEmitter<any>();
  crateTypeListChanged = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getAllSizeTypes(): Observable<SizeType[]> {
    // return this.http.get<SizeType[]>(`${this.api}/sizeTypes`);
    return this.http.get<SizeType>(`${this.api}/sizetype/1`)
      .map(st => [st]);
  }

  createSizeType(st: SizeType): Observable<any> {
    return this.http.post(`${this.api}/sizeType`, st);
  }

  updateSizeType(stId: number, st: SizeType): Observable<any> {
    return this.http.put(`${this.api}/sizeType/${stId}`, st);
  }

}
