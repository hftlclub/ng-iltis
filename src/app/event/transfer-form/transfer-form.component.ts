import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Product } from '../shared/models/product';

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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.grid = this.getGrid(this.product.sizeTypes.length + this.product.crateTypes.length);

    this.form = this.fb.group({
      sizeTypes: this.fb.array(this.product.sizeTypes.map(s => 0)),
      crateTypes: this.fb.array(this.product.crateTypes.map(c => 0))
    }, {validator: this.atLeastOneValidator});
  }


  submitForm() {
    const sizeTypes = {};
    this.form.controls['sizeTypes'].value
      .map(this.sanitizeNumber)
      .forEach((e, i) => {
        const stid = this.product.sizeTypes[i].id;
        sizeTypes[stid] = e;
      });

    this.form.controls['crateTypes'].value
      .map(this.sanitizeNumber)
      .forEach((e, i) => {
        const ct = this.product.crateTypes[i];
        const stid = ct.sizeType.id;
        sizeTypes[stid] += e * ct.slots;
      });

    console.log(sizeTypes);
    // TODO: Send to server

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
