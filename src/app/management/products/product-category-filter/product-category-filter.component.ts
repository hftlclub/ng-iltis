import { ProductListFilterService } from '../shared/product-list-filter.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Category } from '../../../shared/models/category';

@Component({
  selector: 'il-product-category-filter',
  templateUrl: './product-category-filter.component.html',
  styleUrls: ['./product-category-filter.component.scss']
})
export class ProductCategoryFilterComponent implements OnInit {

  categories: Category[];
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private pfs: ProductListFilterService) {}

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];

    this.form = new FormGroup({
      categories: new FormArray(this.categories.map(c => new FormControl()))
    });

    this.pfs.categoriesFilter$
      .subscribe(list => {
        let mask: boolean[];
        if (list) {
          mask = this.listToMask(this.categories, list);
        } else {
          mask = this.categories.map(() => true);
        }
        this.form.get('categories').setValue(mask);
      });

    // when category filter changes, update URL
    this.pfs.categoriesFilter$
      .filter(e => !!e)
      .map(cs => cs.join(','))
      .subscribe(c => {
        this.router.navigate([], { queryParams: { c: c }, relativeTo: this.route })
      });

    // when query params change, update category filter in filter service
    this.route.queryParams
      .map(p => p.c)
      .filter(e => !!e)
      .distinctUntilChanged()
      .subscribe(c => this.pfs.categoriesFilter$.next(
        c.split(',').map(e => parseInt(e, 0))
      ));
  }

  valuesChanged() {
    const list = this.maskToList(this.categories, this.form.get('categories').value);
    this.pfs.categoriesFilter$.next(list)
  }

  toggleCheckbox(i: number) {
    const box = this.form.get(['categories', i]);
    box.setValue(!box.value);
    this.valuesChanged();
  }

  private maskToList(categories: Category[], mask: boolean[]): number[] {
    return categories.map(c => c.id).filter((c, i) => mask[i]);
  }

  private listToMask(categories: Category[], list: number[]): boolean[] {
    return categories.map(c => c.id).map(c => list.includes(c));
  }
}
