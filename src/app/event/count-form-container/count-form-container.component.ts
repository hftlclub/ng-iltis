import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Inventory } from '../../shared/models/inventory';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-count-form-container',
  templateUrl: './count-form-container.component.html',
  styleUrls: ['./count-form-container.component.css']
})
export class CountFormContainerComponent implements OnInit {

  products: Product[];
  inventory: Inventory[];
  mode: string;
  hasChanges = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.route.snapshot.params['mode'];
    this.products = this.route.snapshot.data['products'];
    this.inventory = this.route.snapshot.data['inventory']
      .map(inv => {
        inv.amount = (this.mode === 'counter') ? inv.counter : inv.storage;
        delete inv.storage;
        delete inv.counter;
        return inv;
      });
  }

  get storageMode() {
    return this.mode === 'storage';
  }

}
