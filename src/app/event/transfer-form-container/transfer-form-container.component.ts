import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationsService } from 'angular2-notifications';

import { Product } from '../shared/models/product';
import { TransferFactory } from '../shared/models/transfer/transfer-factory';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-transfer-form-container',
  templateUrl: './transfer-form-container.component.html',
  styleUrls: ['./transfer-form-container.component.css']
})
export class TransferFormContainerComponent implements OnInit {

  product: Product;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
  }


  submitForm(data) {

    const { controls, outgoing } = data;
    const stChanges = {};
    controls['sizeTypes'].value
      .map(this.sanitizeNumber)
      .forEach((e, i) => {
        const stid = this.product.sizeTypes[i].id;
        stChanges[stid] = e;
      });

    controls['crateTypes'].value
      .map(this.sanitizeNumber)
      .forEach((e, i) => {
        const ct = this.product.crateTypes[i];
        const stid = ct.sizeType.id;
        stChanges[stid] += e * ct.slots;
      });

    const transfers = Object.keys(stChanges).map(stid => {
      return {
        product: { id: this.product.id },
        sizeType: { id: this.sanitizeNumber(stid) },
        change: stChanges[stid],
      };
    })
    .filter(t => t.change);

    this.es.transfersAdded.emit(transfers.map(t => TransferFactory.fromObj(t)));


    const mode = outgoing ? 'out' : 'in';
    const eventId = this.route.parent.snapshot.params['eventId'];
    this.loading = true;

    this.es.createStorageTransfer(mode, eventId, transfers).subscribe(res => {
      this.loading = false;
      console.log('ANSWER:', res);
      this.ns.success('Buchung erfasst', 'Die Buchung wurde erfasst.');
    });

  }

  sanitizeNumber(num: any) {
    if (!num) { num = 0; }
    return parseInt(num, 10);
  }

}
