import { ProductListFilterService } from '../shared/product-list-filter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Category } from '../../../shared/models/category';

@Component({
  selector: 'il-product-category-filter',
  templateUrl: './product-category-filter.component.html',
  styleUrls: ['./product-category-filter.component.css']
})
export class ProductCategoryFilterComponent implements OnInit {

  categories: Category[];
  form: FormGroup;

  constructor(private route: ActivatedRoute, private pfs: ProductListFilterService) {}

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];

    this.form = new FormGroup({
      categories: new FormArray(this.categories.map(c => new FormControl()))
    });

    this.pfs.categoriesFilter$
    .subscribe(list => {
      let mask: boolean[];
      if (!list) {
        mask = this.categories.map(() => true);
      } else {
        mask = this.listToMask(this.categories, list);
      }
      console.log(list);
      this.form.get('categories').setValue(mask);
    });
  }

  valuesChanged() {
    const list = this.maskToList(this.categories, this.form.get('categories').value);
    this.pfs.categoriesFilter$.next(list)
  }

  private maskToList(categories: Category[], mask: boolean[]): number[] {
    return categories.map(c => c.id).filter((c, i) => mask[i]);
  }

  private listToMask(categories: Category[], list: number[]): boolean[] {
    return categories.map(c => c.id).map(c => list.includes(c));
  }
}
