import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Event } from '../../shared/models/event/event';
import { Product } from '../../shared/models/product';
import { TransferFactory } from '../../shared/models/transfer/transfer-factory';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-transfer-form-container',
  templateUrl: './transfer-form-container.component.html',
  styleUrls: ['./transfer-form-container.component.css']
})
export class TransferFormContainerComponent implements OnInit {

  product: Product;
  loading = false;
  hideInOutSwitcher = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    const event: Event = this.route.parent.snapshot.data['event'];
    this.hideInOutSwitcher = event.eventType.uiMode === 'private';
  }


  submitForm(data) {
    const { controls, outgoing } = data;
    const stChanges = {};
    controls['sizeTypes'].value
      .map(this.sanitizeInt)
      .forEach((e, i) => {
        const stid = this.product.sizeTypes[i].id;
        stChanges[stid] = e;
      });

    controls['crateTypes'].value
      .map(this.sanitizeInt)
      .forEach((e, i) => {
        const ct = this.product.crateTypes[i];
        const stid = ct.sizeType.id;
        stChanges[stid] += e * ct.slots;
      });

    const transfers = Object.keys(stChanges).map(stid => {
      return {
        product: { id: this.product.id },
        sizeType: { id: this.sanitizeInt(stid) },
        change: stChanges[stid],
      };
    })
    .filter(t => t.change);



    const mode = outgoing ? 'out' : 'in';
    const eventId = this.route.parent.snapshot.params['eventId'];
    this.loading = true;

    this.es.createStorageTransfer(mode, eventId, transfers).subscribe(res => {
      this.loading = false;
      this.es.transfersAdded.emit(res);
      this.ns.success('Buchung', 'Die Buchung wurde erfasst.');
      this.router.navigate(['../../products'], { relativeTo: this.route });
    });

  }

  sanitizeInt(num: any) {
    if (!num) { num = 0; }
    return parseInt(num, 10);
  }

}
