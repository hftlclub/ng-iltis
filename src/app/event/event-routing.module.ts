import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { ProductsResolver } from './shared/products.resolver';
import { ProductResolver } from './shared/product.resolver';

const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        component: ProductOverviewComponent,
        resolve: {
          products: ProductsResolver
        }
      },
      {
        path: 'newtransfer/:productId',
        component: TransferFormComponent,
        resolve: {
          product: ProductResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProductsResolver,
    ProductResolver
  ]
})
export class EventRoutingModule { }
