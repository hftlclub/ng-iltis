import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import _ from 'lodash';

import { Inventory } from '../../shared/models/inventory';
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
  @Output() submitted = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  categories: any = {};
  maxTypeColsNum: number;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.categories = this.productsToCategoryArray(this.products);

    this.categories = this.categories.map(c => {
      c.sizeTypes = _.uniqBy(
        _.flatMap(c.products, p => p.sizeTypes),
        t => t.id
      );

      c.crateTypes = _.uniqBy(
        _.flatMap(c.products, p => p.crateTypes),
        t => t.id
      );

      c.typeColsNum = c.sizeTypes.length + c.crateTypes.length;

      return c;
    });

    this.maxTypeColsNum = _.max(this.categories.map(c => c.typeColsNum));



    this.form = this.fb.group({
      categories: this.fb.array(
        this.categories.map(
          c => this.fb.array(
            c.products.map(p => this.productToFormGroup(p, this.inventory))
          )
        )
      )
    });

    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
  }

  submitForm() {
    const products = _.flatMap(this.form.get('categories').value, (category, ci) => {
      return category.map((product, pi) => {
        product.id = this.categories[ci].products[pi].id;
        return product;
      });
    })
    .filter(p => p.active);

    const crateTypesMap = _.keyBy(
      _.flatMap(this.products, p => p.crateTypes),
      c => c.id
    );

    const output = _.flatMap(products, p => {
      _.forIn(p.crateTypes, (numCrates, ctId) => {
        const ct = crateTypesMap[ctId];
        const stId = ct.sizeType.id;
        p.sizeTypes[stId] += ct.slots * numCrates;
      });

      const productWithSizeTypes = _.mapValues(p.sizeTypes, (amount, stId) => {
        return {
          amount: amount,
          sizeTypeId: parseInt(stId, 10),
          productId: p.id
        };
      });

      return _.values(productWithSizeTypes);
    });

    this.submitted.emit(output);
  }


  setFormGroupActive(ci: number, pi: number, active = true) {
    this.form.get(['categories', ci, pi, 'active'])
      .setValue(active);
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

    p.sizeTypes.forEach(st => {
      const invForSt = invForProduct.find(k => k.sizeType.id === st.id);
      let numItems = 0;
      if (invForSt) {
        numItems = invForSt.amount;
        invForSt.amount = 0;
      }
      stMap[st.id] = numItems;
    });

    return this.fb.group({
      active: false,
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
      };

      categories[key].products.push(p);
    });

    return Object.keys(categories)
      .map(k => categories[k])
      .map(c => {
        c.firstUnit = c.products[0].unit;
        return c;
      });
  }


  hasId(arr: any[], id: number): boolean {
    return !!arr.find(item => item.id === id);
  }

  newArray(num) {
    return new Array(num);
  }
}
