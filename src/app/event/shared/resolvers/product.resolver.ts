import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Injectable()
export class ProductResolver implements Resolve<Product> {

  constructor(private ps: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.ps.getSingle(route.params['productId']);
  }

}
