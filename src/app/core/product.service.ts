import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product, ProductFactory } from '../shared/models/product';

@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.api}/products`)
      .retry(3)
      .map(raw => raw.map(p => ProductFactory.fromObj(p)));
  }

  getSingle(id: number): Observable<Product> {
    return this.http.get(`${this.api}/product/${id}`)
      .retry(3)
      .map(raw => ProductFactory.fromObj(raw));
  }

}
