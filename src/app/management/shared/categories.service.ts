import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';

import { Category } from '../../shared/models/category';

@Injectable()
export class CategoriesService {

  categoryListChanged = new EventEmitter<any>()

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.api}/categories`)
      .retry(3)
  }

  getSingle(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.api}/category/${id}`)
      .retry(3)
  }

  delete(categoryId: number): Observable<any> {
    return this.http.delete(`${this.api}/category/${categoryId}`);
  }

  create(category: Category): Observable<any> {
    return this.http.post(`${this.api}/category`, category);
  }

  update(categoryId: number, category: Category): Observable<any> {
    return this.http.put(`${this.api}/category/${categoryId}`, category);
  }

}
