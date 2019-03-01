import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Inventory, InventoryFactory } from '../../shared/models/inventory';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient, @Inject('API_URL') private api) {}

  getCurrentInventory(): Observable<Inventory[]> {
    return this.http.get<any[]>(`${this.api}/inventory`).pipe(
      retry(3),
      map(raw => raw.map(inv => InventoryFactory.fromObj(inv)))
    );
  }
}
