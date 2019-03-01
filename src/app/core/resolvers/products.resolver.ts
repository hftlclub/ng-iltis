import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Product } from '../../shared/models/product';
import { ProductService } from '../product.service';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private ps: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const inactProducts = !!route.data.showInactiveProducts;
    const inactSizes = !!route.data.showInactiveSizes;
    return this.ps.getAll(inactProducts, inactSizes);
  }
}
