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
    const products = this.route.snapshot.data['products'];

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
            c.products.map(p => this.fb.group({
              sizeTypes: this.fb.group(_.mapValues(_.keyBy(p.sizeTypes.map(s => s.id), s => s), s => 0)),
              crateTypes: this.fb.group(_.mapValues(_.keyBy(p.crateTypes.map(s => s.id), s => s), s => 0))
            }))
          )
        )
      )
    });

    console.log(this.form.value);

  }

  productsToCategoryArray(products: Product[]): Category[] {
    const categories = {};

    /* `products` is a list of products each with one category assigned.
    transform this to a list of categories each with a list of assigned products */
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
