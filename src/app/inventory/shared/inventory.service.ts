
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Inventory, InventoryFactory } from '../../shared/models/inventory';

@Injectable()
export class InventoryService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api
  ) { }

  getCurrentInventory(): Observable<Inventory> {
    return this.http.get<any[]>(`${this.api}/inventory`)
      .pipe(
        retry(3),
        map(raw => InventoryFactory.fromObj(raw))
      );
  }

}
