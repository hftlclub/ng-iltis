import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Product } from '../models/product/product';
import { ProductService } from '../product.service';

@Injectable()
export class ProductsResolver implements Resolve<Product[]> {

  constructor(private ps: ProductService) {}

  resolve() {
    return this.ps.getAll();
  }

}
