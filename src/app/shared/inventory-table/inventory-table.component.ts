import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import _ from 'lodash';

import { SizeType } from '../models/sizetype';
import { Product } from '../models/product';
import { Unit } from '../models/unit';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'il-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit, OnChanges {

  @Input() inventory: Inventory[];
  productGroups: ProductGroup[];
  d = new Date();

  ngOnInit() { }

  ngOnChanges(c: SimpleChanges) {
    if (c.inventory && c.inventory.currentValue) {
      this.productGroups = this.transformToTableData(this.inventory);
    }
  }

  private transformToTableData(inventory: Inventory[]): ProductGroup[] {
    const buildInventory = inv => ({
      sizeType: inv.sizeType,
      minStock: inv.minStock,
      storage: inv.storage,
      counter: inv.counter,
      total: inv.storage + inv.counter
    });

    const addInventoryCalculations = inv => ({
      ...inv,
      totalVolume: inv.total * inv.sizeType.amount,
      isBelowMin: inv.total <= inv.minStock,
      isCloseToMin: inv.minStock && inv.total < (inv.minStock + 20) && inv.total > inv.minStock
    });

    const buildGroup = g => ({
      product: g[0].product,
      inventory: g.map(buildInventory).map(addInventoryCalculations),
    });

    const addGroupCalculations = g => ({
      ...g,
      totalVolume: g.inventory.reduce((acc, inv) => acc + inv.totalVolume, 0),
      someBelowMin: g.inventory.some(inv => inv.isBelowMin),
      someCloseToMin: g.inventory.some(inv => inv.isCloseToMin),
    });

    return Object.values(_.groupBy(inventory, inv => inv.product.id))
      .map(buildGroup).map(addGroupCalculations)
      .sort((a, b) => a.product.name.localeCompare(b.product.name));
  }
}


interface ProductGroup {
  product: Product;
  inventory: ProductGroupInv[];
  totalVolume: number;
  someBelowMin: boolean;
  someCloseToMin: boolean;
}

interface ProductGroupInv {
  sizeType: SizeType;
  storage: number;
  counter: number;
  total: number;
  totalVolume: number;
  minStock: number;
  isBelowMin: boolean;
  isCloseToMin: boolean;
}
