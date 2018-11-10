import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';

import { EventService } from '../shared/event.service';
import { Event } from '../../shared/models/event';
import { Transaction } from '../../shared/models/transaction';
import { Inventory } from '../../shared/models/inventory';

@Component({
  selector: 'il-event-inventory',
  templateUrl: './event-inventory.component.html',
  styleUrls: ['./event-inventory.component.css']
})
export class EventInventoryComponent implements OnInit {

  event: Event;
  data$: Observable<InventoryAndTransactions>;

  constructor(private es: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.parent.snapshot.data.event;

    this.data$ = Observable.forkJoin(
      this.es.getInventory(this.event.id),
      this.es.getTransactionsByEvent(this.event.id)
    ).pipe(
      map(arr => ({ inventory: arr[0], transactions: arr[1] }))
    );
  }
}

interface InventoryAndTransactions {
  inventory: Inventory[];
  transactions: Transaction[];
}
