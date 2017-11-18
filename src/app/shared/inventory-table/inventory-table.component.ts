import { Unit } from '../models/unit';
import { SizeType } from '../models/sizetype';
import { Product } from '../models/product';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Inventory } from '../models/inventory';

import _ from 'lodash';

@Component({
  selector: 'il-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit, OnChanges {

  @Input() inventory: Inventory[];
  productGroups: ProductGroup[];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(c: SimpleChanges) {
    if (c.inventory && c.inventory.currentValue) {
      this.productGroups = this.transformToTableData(this.inventory);
    }
  }


  transformToTableData(inventory: Inventory[]): ProductGroup[] {
    // MOCK unit!!
    inventory.forEach(inv => inv.product.unit = new Unit(1, 'l', 'Liter', false));

    const productGroups = Object.values(_.groupBy(inventory, inv => inv.product.id))
      .map(g => ({
        product: g[0].product,
        inventory: g.map(inv => ({
          sizeType: inv.sizeType,
          storage: inv.storage,
          counter: inv.counter,
          total: inv.storage + inv.counter,
          totalVolume: (inv.storage + inv.counter) * inv.sizeType.amount
        })),
      }))
      .map(g => ({
        ...g,
        totalVolume: g.inventory.reduce((acc, inv) => acc + inv.totalVolume, 0),
      }));

    return productGroups;
  }
}


export interface ProductGroup {
  product: Product;
  inventory: {
    sizeType: SizeType;
    storage: number,
    counter: number;
    total: number;
    totalVolume: number
  }[];
  totalVolume: number;
}
