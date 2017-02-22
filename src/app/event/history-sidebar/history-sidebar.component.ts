import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transfer } from '../shared/models/transfer';
import { Event } from '../shared/models/event';

@Component({
  selector: 'il-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent implements OnInit {

  transfers: Transfer[];
  event: Event;
  transferCountMapping: {[k: string]: string} = {'=0': 'Keine Buchungen', '=1': 'Eine Buchung', 'other': '# Buchungen'};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.transfers = this.route.snapshot.data['transfers'];
    this.event = this.route.snapshot.data['event'];
  }

  get childUrlSegment() {
    return this.route.snapshot.children[0].url[0].path;
  }

}
