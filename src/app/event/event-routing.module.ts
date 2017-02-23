import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { TransferFormContainerComponent } from './transfer-form-container/transfer-form-container.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { EventListComponent } from './event-list/event-list.component';

import { ProductsResolver } from './shared/resolvers/products.resolver';
import { ProductResolver } from './shared/resolvers/product.resolver';
import { EventResolver } from './shared/resolvers/event.resolver';
import { EventsResolver } from './shared/resolvers/events.resolver';
import { TransfersResolver } from './shared/resolvers/transfers.resolver';
import { TransactionsResolver } from './shared/resolvers/transactions.resolver';
import { EventTypesResolver } from './shared/resolvers/eventtypes.resolver';

const routes: Routes = [
  { path: 'new', redirectTo: 'new/event', pathMatch: 'full' },
  {
    path: 'new/:uiMode',
    component: NewEventFormComponent,
    pathMatch: 'full',
    resolve: {
      eventTypes: EventTypesResolver
    }
  },
  {
    path: '',
    component: EventListComponent,
    pathMatch: 'full',
    resolve: {
      events: EventsResolver
    }
  },
  {
    path: ':eventId',
    component: EventComponent,
    resolve: {
      event: EventResolver,
      transfers: TransfersResolver,
      transactions: TransactionsResolver
    },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: EventOverviewComponent },
      {
        path: 'products',
        component: ProductOverviewComponent,
        resolve: {
          products: ProductsResolver
        }
      },
      {
        path: 'newtransfer/:productId',
        component: TransferFormContainerComponent,
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
    EventsResolver,
    EventResolver,
    TransfersResolver,
    TransactionsResolver,
    EventTypesResolver
  ]
})
export class EventRoutingModule { }
