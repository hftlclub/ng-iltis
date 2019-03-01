import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import { Transfer } from '../../shared/models/transfer';
import { Transaction } from '../../shared/models/transaction';
import { Event } from '../../shared/models/event';
import { EventService } from './../shared/event.service';

@Component({
  selector: 'il-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.scss']
})
export class HistorySidebarComponent implements OnInit, OnDestroy {
  @Input() visible;
  @Input() event: Event;
  @Output() overlayClick = new EventEmitter();

  transfers: Transfer[] = [];
  transactions: Transaction[] = [];
  itemsCountMapping: { [k: string]: string } = { '=0': 'Keine Buchungen', '=1': 'Eine Buchung', other: '# Buchungen' };

  transfersAddedSub: Subscription;
  countFinishedSub: Subscription;
  eventClosedSub: Subscription;

  scroller: PageScrollInstance;

  @ViewChild('scrollArea') scrollArea: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private es: EventService,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.transfers = this.route.snapshot.data.transfers;
    this.transactions = this.route.snapshot.data.transactions;

    this.transfersAddedSub = this.es.transfersAdded.subscribe(t => {
      this.transfers = this.transfers.concat(t);
      setTimeout(() => this.scrollToBottom(), 200);
    });

    this.countFinishedSub = this.es.countFinished.subscribe(t => {
      this.transfers = t;
      setTimeout(() => this.scrollToBottom(), 200);
    });

    this.eventClosedSub = this.es.eventClosed
      .pipe(switchMap(eventId => this.es.getTransactionsByEvent(eventId)))
      .subscribe(transactions => {
        this.transfers = [];
        this.transactions = transactions;
      });

    this.setupScroller();
  }

  setupScroller() {
    this.scroller = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#newTransferBtn',
      scrollingViews: [this.scrollArea.nativeElement],
      pageScrollDuration: 2000
    });
  }

  scrollToBottom() {
    this.pageScrollService.start(this.scroller);
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
    return this.event.active ? this.transfers.length : this.transactions.length;
  }

  handleOverlayClick() {
    this.overlayClick.emit();
  }
}
