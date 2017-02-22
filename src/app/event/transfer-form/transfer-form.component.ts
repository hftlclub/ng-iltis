import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../shared/models/product';
import { TransferFactory } from '../shared/models/transfer/transfer-factory';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  icons: { [k: string]: string } = {
    'out': 'fa-sign-out',
    'in': 'fa-sign-in fa-flip-horizontal'
  };

  form: FormGroup;

  outgoingTransfer = true;
  product: Product;
  grid: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.grid = this.getGrid(this.product.sizeTypes.length + this.product.crateTypes.length);

    this.form = this.fb.group({
      sizeTypes: this.fb.array(this.product.sizeTypes.map(s => 0)),
      crateTypes: this.fb.array(this.product.crateTypes.map(c => 0))
    }, {validator: this.atLeastOneValidator});

  }


  submitForm() {
    const stChanges = {};
    this.form.controls['sizeTypes'].value
      .map(this.sanitizeNumber)
      .forEach((e, i) => {
        const stid = this.product.sizeTypes[i].id;
        stChanges[stid] = e;
      });

    this.form.controls['crateTypes'].value
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


    const mode = this.outgoingTransfer ? 'out' : 'in';
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



  getGrid(sizesLength: number) {
    const map = {
      1: { col: 4, offset: 4 },
      2: { col: 3, offset: 2 },
      3: { col: 4, offset: 0 },
      4: { col: 3, offset: 0 },
    };
    return map[sizesLength] || { col: 2, offset: 0 };
  }

  atLeastOneValidator(controlGroup: FormGroup) {
    const st = controlGroup.controls['sizeTypes'];
    const ct = controlGroup.controls['crateTypes'];

    return (ct['controls'].some(e => e.value) || st['controls'].some(e => e.value))
      ? null
      : { atLeastOne: false };
  }
}
