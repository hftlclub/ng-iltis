import { switchMap } from 'rxjs/operators';
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

  transfersAddedSub: Subscription;
  countFinishedSub: Subscription;
  eventClosedSub: Subscription;

  constructor(private route: ActivatedRoute, private es: EventService) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.transfers = this.route.snapshot.data['transfers'];
    this.transactions = this.route.snapshot.data['transactions'];

    this.transfersAddedSub = this.es.transfersAdded
      .subscribe(t => this.transfers = this.transfers.concat(t));

    this.countFinishedSub = this.es.countFinished
      .subscribe(t => this.transfers = t);

    this.eventClosedSub = this.es.eventClosed.pipe(
      switchMap(eventId => this.es.getTransactionsByEvent(eventId))
    )
    .subscribe(transactions => {
      this.transfers = [];
      this.transactions = transactions;
    });

  }


  ngOnDestroy() {
    this.transfersAddedSub.unsubscribe();
    this.countFinishedSub.unsubscribe();
    this.eventClosedSub.unsubscribe();
  }

  get childUrlSegment(): string {
    return this.route.snapshot.children[0].url[0].path;
  }

  get hasItems(): boolean {
    return !!this.transfers.length || !!this.transactions.length;
  }

  get itemCount(): number {
    return (this.event.active) ? this.transfers.length : this.transactions.length;
  }

}
