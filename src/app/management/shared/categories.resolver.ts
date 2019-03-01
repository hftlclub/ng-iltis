import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Category } from '../../shared/models/category';
import { CategoriesService } from './categories.service';

@Injectable({ providedIn: 'root' })
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private cs: CategoriesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const productCount = !!route.data.productCount;
    return this.cs.getAll(productCount);
  }
}
