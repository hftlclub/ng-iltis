import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private es: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.event = this.route.parent.snapshot.data.event;

    this.data$ = forkJoin(this.es.getInventory(this.event.id), this.es.getTransactionsByEvent(this.event.id)).pipe(
      map(([inventory, transactions]) => ({ inventory, transactions }))
    );
  }
}

interface InventoryAndTransactions {
  inventory: Inventory[];
  transactions: Transaction[];
}
