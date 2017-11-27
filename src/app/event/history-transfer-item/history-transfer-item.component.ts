import { Component, Input } from '@angular/core';

import { Transfer } from '../../shared/models/transfer';

@Component({
  selector: 'il-history-transfer-item',
  templateUrl: './history-transfer-item.component.html',
  styleUrls: ['./history-transfer-item.component.scss']
})
export class HistoryTransferItemComponent {

  @Input() transfer: Transfer;

}
