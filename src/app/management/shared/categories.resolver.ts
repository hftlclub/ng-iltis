import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Category } from '../../shared/models/category';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {

  constructor(private cs: CategoriesService) {}

  resolve() {
    return this.cs.getAll();
  }

}
