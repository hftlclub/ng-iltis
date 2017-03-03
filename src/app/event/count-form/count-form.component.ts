import { Inventory } from './../../shared/models/inventory/inventory';
import { Category } from './../../shared/models/category/category';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

import { Product } from '../../shared/models/product/product';

@Component({
  selector: 'il-count-form',
  templateUrl: './count-form.component.html',
  styleUrls: ['./count-form.component.css']
})
export class CountFormComponent implements OnInit {

  products: Product[];
  categories: any = {};
  maxTypeColsNum: number;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    const products: Product[] = this.route.snapshot.data['products'];
    const inventory: Inventory[] = this.route.snapshot.data['inventory'];

    this.categories = this.productsToCategoryArray(products);

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
            c.products.map(p => this.productToFormGroup(p, inventory))
          )
        )
      )
    });
  }


  productToFormGroup(p: Product, inv: Inventory[]): FormGroup {
    const invForProduct = inv.filter(i => i.product.id === p.id);


    const stMap = {};
    const ctMap = {};

    p.crateTypes.forEach(ct => {
      console.log(ct);

      const invForSt = invForProduct.find(k => k.sizeType.id === ct.sizeType.id);

      let numCrates = 0;
      if (invForSt) {
        numCrates = Math.floor(invForSt.storage / ct.slots);
        invForSt.storage -= numCrates * ct.slots;
      }

      ctMap[ct.id] = numCrates;
    });

    p.sizeTypes.forEach(st => {
      const invForSt = invForProduct.find(k => k.sizeType.id === st.id);
      let numItems = 0;
      if (invForSt) {
        numItems = invForSt.storage;
        invForSt.storage = 0;
      }
      stMap[st.id] = numItems;
    });

    return this.fb.group({
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

    return Object.keys(categories).map(k => categories[k]);
  }

  hasId(arr: any[], id: number): boolean {
    return !!arr.find(item => item.id === id);
  }

  newArray(num) {
    return new Array(num);
  }
}
