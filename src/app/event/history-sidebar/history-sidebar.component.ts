import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Transfer } from '../../shared/models/transfer';
import { Transaction } from '../../shared/models/transaction';
import { Event } from '../../shared/models/event';
import { EventService } from './../shared/event.service';

@Component({
  selector: 'il-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent implements OnInit, OnDestroy {

  transfers: Transfer[] = [];
  transactions: Transaction[] = [];
  event: Event;
  itemsCountMapping: {[k: string]: string} = {'=0': 'Keine Buchungen', '=1': 'Eine Buchung', 'other': '# Buchungen'};

  transfersAdded$: Subscription;

  constructor(private route: ActivatedRoute, private es: EventService) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.transfers = this.route.snapshot.data['transfers'];
    this.transactions = this.route.snapshot.data['transactions'];

    this.transfersAdded$ = this.es.transfersAdded
      .subscribe(t => this.transfers = this.transfers.concat(t));
  }


  ngOnDestroy() {
    this.transfersAdded$.unsubscribe();
  }

  get childUrlSegment() {
    return this.route.snapshot.children[0].url[0].path;
  }

  get hasItems() {
    return !!this.transfers.length || !!this.transactions.length;
  }

  get itemCount() {
    return (this.event.active) ? this.transfers.length : this.transactions.length;
  }

}
