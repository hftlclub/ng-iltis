import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Product } from '../shared/models/product/product';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

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
    });
  }


  submitForm(event) {
    let sizeTypes = this.product.sizeTypes.reduce((acc, cur, i) => {
      acc[cur.id] = 0;
      return acc;
    }, {});

    sizeTypes = this.form.controls['sizeTypes'].value.reduce((acc, cur, i) => {
      const st = this.product.sizeTypes[i];
      if (!cur) { return acc; }
      acc[st.id] += parseInt(cur, 10);
      return acc;
    }, sizeTypes);

    sizeTypes = this.form.controls['crateTypes'].value.reduce((acc, cur, i) => {
      const ct = this.product.crateTypes[i];
      if (!cur) { return acc; }
      acc[ct.sizeType.id] += parseInt(cur, 10) * ct.slots;
      return acc;
    }, sizeTypes);


    console.log(sizeTypes);
    // TODO: Send to server

  }



  getGrid(sizesLength: number) {
    const map = {
      1: { col: 2, offset: 5 },
      2: { col: 3, offset: 3 },
      3: { col: 2, offset: 3 },
      4: { col: 3, offset: 0 },
    };
    return map[sizesLength] || { col: 2, offset: 0 };
  }

}
