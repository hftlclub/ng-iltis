import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../shared/models/product/product';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  outgoingTransfer = true;
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
  }

  newArray(num) {
    return new Array(num);
  }

}
