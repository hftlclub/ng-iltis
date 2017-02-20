import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Transfer } from '../shared/models/transfer/transfer';

@Component({
  selector: 'il-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent implements OnInit {

  transfers: Transfer[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.transfers = this.route.snapshot.data['transfers'];
    console.log(this.transfers);
  }

}
