import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';

import { ProductsResolver } from './shared/resolvers/products.resolver';
import { ProductResolver } from './shared/resolvers/product.resolver';
import { EventResolver } from './shared/resolvers/event.resolver';
import { TransfersResolver } from './shared/resolvers/transfers.resolver';

const routes: Routes = [
  { path: 'event/new', component: NewEventFormComponent },
  {
    path: 'event/:eventId',
    component: EventComponent,
    resolve: {
      event: EventResolver,
      transfers: TransfersResolver
    },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: EventOverviewComponent,
        resolve: {
          event: EventResolver
        }
      },
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
    ProductResolver,
    EventResolver,
    TransfersResolver
  ]
})
export class EventRoutingModule { }
