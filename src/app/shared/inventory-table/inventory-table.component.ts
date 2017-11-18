import { Unit } from '../models/unit';
import { SizeType } from '../models/sizetype';
import { Product } from '../models/product';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Inventory } from '../models/inventory';

import _ from 'lodash';

@Component({
  selector: 'il-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit, OnChanges {

  @Input() inventory: Inventory[];
  productGroups: ProductGroup[];
  d = new Date();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(c: SimpleChanges) {
    if (c.inventory && c.inventory.currentValue) {
      this.productGroups = this.transformToTableData(this.inventory);
    }
  }


  transformToTableData(inventory: Inventory[]): ProductGroup[] {
    const productGroups = Object.values(_.groupBy(inventory, inv => inv.product.id))
      .map(g => ({
        product: g[0].product,
        inventory: g.map(inv => ({
          sizeType: inv.sizeType,
          minStock: inv.minStock,
          storage: inv.storage,
          counter: inv.counter,
          total: inv.storage + inv.counter,
          totalVolume: (inv.storage + inv.counter) * inv.sizeType.amount
        })),
      }))
      .map(g => ({
        ...g,
        totalVolume: g.inventory.reduce((acc, inv) => acc + inv.totalVolume, 0),
      }))
      .sort((a, b) => a.product.name.localeCompare(b.product.name));

    return productGroups;
  }

  isNearlyBelowMin(inv: ProductGroupInv): boolean {
    return inv.minStock && inv.total < (inv.minStock + 20) && inv.total > inv.minStock;
  }

  isBelowMin(inv: ProductGroupInv): boolean {
    return inv.total <= inv.minStock;
  }
}


interface ProductGroup {
  product: Product;
  inventory: ProductGroupInv[];
  totalVolume: number;
}

interface ProductGroupInv {
  sizeType: SizeType;
  storage: number;
  counter: number;
  total: number;
  totalVolume: number;
  minStock: number;
}
