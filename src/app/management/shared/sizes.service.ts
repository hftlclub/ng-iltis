import { CrateType } from '../../shared/models/cratetype';
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
    return this.http.get<SizeType[]>(`${this.api}/sizetypes`);
  }

  createSizeType(st: SizeType): Observable<any> {
    return this.http.post(`${this.api}/sizetype`, st);
  }

  updateSizeType(stId: number, st: SizeType): Observable<any> {
    return this.http.put(`${this.api}/sizetype/${stId}`, st);
  }

  deleteSizeType(stId: number): Observable<any> {
    return this.http.delete(`${this.api}/sizetype/${stId}`);
  }


  getAllCrateTypes(): Observable<CrateType[]> {
    return this.http.get<CrateType[]>(`${this.api}/cratetypes`);
  }

  createCrateType(ct: CrateType): Observable<any> {
    return this.http.post(`${this.api}/cratetype`, ct);
  }

  updateCrateType(ctId: number, ct: CrateType): Observable<any> {
    return this.http.put(`${this.api}/cratetype/${ctId}`, ct);
  }

  deleteCrateType(ctId: number): Observable<any> {
    return this.http.delete(`${this.api}/cratetype/${ctId}`);
  }

}
