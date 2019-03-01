import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from '../../shared/models/product';
import { ProductService } from '../product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {
  constructor(private ps: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const inactSizes = !!route.data.showInactiveSizes;
    return this.ps.getSingle(route.params.productId, inactSizes);
  }
}
