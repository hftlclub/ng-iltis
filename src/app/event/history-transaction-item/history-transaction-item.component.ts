import { Component, Input } from '@angular/core';

import { Transaction } from '../../shared/models/transaction';

@Component({
  selector: 'il-history-transaction-item',
  templateUrl: './history-transaction-item.component.html',
  styleUrls: ['./history-transaction-item.component.css']
})
export class HistoryTransactionItemComponent {

  @Input() transaction: Transaction;

}
