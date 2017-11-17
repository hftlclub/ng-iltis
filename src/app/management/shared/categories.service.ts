import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';

import { Category } from '../../shared/models/category';

@Injectable()
export class CategoriesService {

  categoryListChanged = new EventEmitter<any>()

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getAll(productCount: boolean = false): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.api}/categories?productCount=${productCount}`)
      .pipe(retry(3))
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
