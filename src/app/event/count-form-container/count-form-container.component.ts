import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Inventory } from '../../shared/models/inventory';
import { Product } from '../../shared/models/product';
import { Transfer } from '../../shared/models/transfer';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-count-form-container',
  templateUrl: './count-form-container.component.html',
  styleUrls: ['./count-form-container.component.css']
})
export class CountFormContainerComponent implements OnInit {

  products: Product[];
  inventory: Inventory[];
  transfers: Transfer[];
  eventId: number;
  mode: string;
  hasChanges = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.mode = this.route.snapshot.params['mode'];
    this.eventId = this.route.parent.snapshot.params['eventId'];
    this.products = this.route.snapshot.data['products'];
    this.transfers = this.route.snapshot.data['transfers'];

    // in counter count mode, remove crate types so that only size types can be counted
    if (this.mode === 'counter') {
      this.products = this.products.map(p => {
        p.crateTypes = [];
        return p;
      });
    }

    // the actual number of items of a sizetype is needed in `Inventory.amount`
    // depending on the mode (storage or counter), it's in different keys
    this.inventory = this.route.snapshot.data['inventory']
      .map(inv => {
        inv.amount = (this.mode === 'counter') ? inv.counter : inv.storage;
        delete inv.storage;
        delete inv.counter;
        return inv;
      });
  }


  processNewValues(items: any[]) {
    const transfers = items.map(it => ({
      product: { id: it.productId },
      sizeType: { id: it.sizeTypeId },
      change: it.amount
    }));

    this.es.transmitCount(this.mode, this.eventId, transfers)
      .subscribe(res => {
        this.hasChanges = false;
        this.es.countFinished.emit(res);
        this.ns.success(this.storageMode ? 'Lagerzählung' : 'Kühlschrankzählung', 'Die Zählung wurde erfasst.');
        this.navigateToEventPage();
      },
      err => {
        this.ns.error('Fehler', 'Vorgang abgebrochen');
      });
  }

  cancelForm() {
    this.navigateToEventPage();
  }

  navigateToEventPage() {
    this.router.navigate(['../../overview'], { relativeTo: this.route });
  }

  get storageMode(): boolean {
    return this.mode === 'storage';
  }

}
