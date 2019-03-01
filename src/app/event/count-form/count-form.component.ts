import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { keyBy, mapValues, flatMap, forIn, uniq, uniqBy, max } from 'lodash-es';

import { Transfer } from '../../shared/models/transfer';
import { Size } from '../../shared/models/size';
import { Category } from '../../shared/models/category';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-count-form',
  templateUrl: './count-form.component.html',
  styleUrls: ['./count-form.component.css']
})
export class CountFormComponent implements OnInit {
  @Input() products: Product[];
  @Input() inventory: any[];
  @Input() transfers: Transfer[];
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  transferredProducts: number[] = [];

  categories: any = {};
  maxTypeColsNum: number;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.categories = this.productsToCategoryArray(this.products);

    this.categories = this.categories.map(c => {
      c.sizeTypes = uniqBy(flatMap(c.products, p => p.sizes.map(s => s.sizeType)), t => t.id);

      c.crateTypes = uniqBy(flatMap(c.products, p => p.crateTypes), t => t.id);

      c.typeColsNum = c.sizeTypes.length + c.crateTypes.length;

      return c;
    });

    this.maxTypeColsNum = max(this.categories.map(c => c.typeColsNum));

    // IDs of products that we already have tranasfers for
    this.transferredProducts = uniq(this.transfers.map(t => t.product.id));

    this.form = this.fb.group({
      categories: this.fb.array(
        this.categories.map(c => this.fb.array(c.products.map(p => this.productToFormGroup(p, this.inventory))))
      )
    });

    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
  }

  submitForm() {
    const products = flatMap(this.form.get('categories').value, (category, ci) => {
      return category.map((product, pi) => {
        product.id = this.categories[ci].products[pi].id;
        return product;
      });
    }).filter(p => p.active);

    const crateTypesMap = keyBy(flatMap(this.products, p => p.crateTypes), c => c.id);

    const output = flatMap(products, p => {
      const sizeTypesAmounts = mapValues(p.sizeTypes, v => parseInt(v, 0));

      forIn(p.crateTypes, (numCrates, ctId) => {
        const ct = crateTypesMap[ctId];
        const stId = ct.sizeType.id;
        sizeTypesAmounts[stId] += ct.slots * numCrates;
      });

      const productWithSizeTypes = mapValues(sizeTypesAmounts, (amount, stId) => {
        return {
          amount,
          sizeTypeId: parseInt(stId, 10),
          productId: p.id
        };
      });

      return Object.values(productWithSizeTypes);
    });

    this.submitted.emit(output);
  }

  cancelForm() {
    this.cancelled.emit();
  }

  setFormGroupActive(ci: number, pi: number, active = true) {
    this.form.get(['categories', ci, pi, 'active']).setValue(active);
  }

  productToFormGroup(p: Product, inv: any[]): FormGroup {
    const invForProduct = inv.filter(i => i.product.id === p.id);

    const stMap = {};
    const ctMap = {};

    p.crateTypes
      .sort((a, b) => b.slots - a.slots)
      .forEach(ct => {
        const invForSt = invForProduct.find(k => k.sizeType.id === ct.sizeType.id);

        let numCrates = 0;
        if (invForSt) {
          numCrates = Math.floor(invForSt.amount / ct.slots);
          invForSt.amount -= numCrates * ct.slots;
        }

        ctMap[ct.id] = numCrates;
      });

    p.sizes.forEach(s => {
      const invForSt = invForProduct.find(k => k.sizeType.id === s.sizeType.id);
      let numItems = 0;
      if (invForSt) {
        numItems = invForSt.amount;
        invForSt.amount = 0;
      }
      stMap[s.sizeType.id] = numItems;
    });

    return this.fb.group({
      active: this.transferredProducts.includes(p.id),
      sizeTypes: this.fb.group(stMap),
      crateTypes: this.fb.group(ctMap)
    });
  }

  productsToCategoryArray(products: Product[]): Category[] {
    const categories = {};

    products.forEach(p => {
      const key = p.category.id;
      if (!categories[key]) {
        categories[key] = p.category;
        categories[key].products = [];
      }

      categories[key].products.push(p);
    });

    return Object.keys(categories)
      .map(k => categories[k])
      .map(c => ({
        ...c,
        firstUnit: c.products[0].unit
      }));
  }

  hasSizeTypeId(sizes: Size[], id: number): boolean {
    return !!sizes.find(s => s.sizeType.id === id);
  }

  hasId(arr: any[], id: number): boolean {
    return !!arr.find(item => item.id === id);
  }

  newArray(num) {
    return new Array(num);
  }
}
