import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from './models/product/product';
import { ProductFactory } from './models/product/product-factory';


@Injectable()
export class ProductService {

  constructor(@Inject('API_URL') private api, private http: Http) { }

  getAll(): Observable<Product[]> {
    return this.http.get(`${this.api}/products`)
      .retry(3)
      .map(res => res.json())
      .map(raw => raw.map(p => ProductFactory.fromObj(p)));
  }

}
