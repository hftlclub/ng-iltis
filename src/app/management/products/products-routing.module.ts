import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsResolver } from '../../core/resolvers/products.resolver';
import { ProductResolver } from '../../core/resolvers/product.resolver';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      products: ProductsResolver
    }
  },
  {
    path: ':productId/details',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
