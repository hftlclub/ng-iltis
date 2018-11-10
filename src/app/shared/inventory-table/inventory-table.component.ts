import { Transaction } from '../models/transaction';
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
  @Input() transactions: Transaction[];
  @Input() withTransactions: boolean;
  @Input() date = new Date();
  @Input() showDate = true;
  productGroups: ProductGroup[];

  ngOnInit() { }

  ngOnChanges(c: SimpleChanges) {
    if (this.withTransactions && (c.inventory || c.transactions)) {
      this.productGroups = this.transformToTableData(this.inventory, this.transactions);

    } else if (!this.withTransactions && this.inventory && c.inventory) {
      this.productGroups = this.transformToTableData(this.inventory);
    }
  }

  private transformToTableData(inventory: Inventory[], transactions: Transaction[] = []): ProductGroup[] {
    const findTransactionChange = (pid: number, stid: number) => {
      const tr = transactions.find(t => t.product.id === pid && t.sizeType.id === stid);
      return tr ? tr.changeTotal : 0;
    };

    const buildInventory = inv => ({
      sizeType: inv.sizeType,
      product: inv.product,
      minStock: inv.minStock,
      storage: inv.storage,
      counter: inv.counter,
      total: inv.storage + inv.counter
    });

    const addInventoryCalculations = inv => ({
      ...inv,
      totalVolume: inv.total * inv.sizeType.amount,
      isBelowMin: inv.total <= inv.minStock,
      isCloseToMin: inv.minStock && inv.total < (inv.minStock + 20) && inv.total > inv.minStock,
      changeTotal: transactions.length ? findTransactionChange(inv.product.id, inv.sizeType.id) : null
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
  changeTotal?: number;
}
