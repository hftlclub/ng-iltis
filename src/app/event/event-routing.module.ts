import { EventInventoryComponent } from './event-inventory/event-inventory.component';
import { CloseFormContainerComponent } from './close-form-container/close-form-container.component';
import { InventoryResolver } from './shared/resolvers/inventory.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { TransferFormContainerComponent } from './transfer-form-container/transfer-form-container.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { CountFormContainerComponent } from './count-form-container/count-form-container.component';
import { NewEventSelectionComponent } from './new-event-selection/new-event-selection.component';

import { ProductsResolver } from '../core/resolvers/products.resolver';
import { ProductResolver } from '../core/resolvers/product.resolver';
import { EventResolver } from './shared/resolvers/event.resolver';
import { EventsResolver } from './shared/resolvers/events.resolver';
import { TransfersResolver } from './shared/resolvers/transfers.resolver';
import { TransactionsResolver } from './shared/resolvers/transactions.resolver';
import { EventTypesResolver } from './shared/resolvers/eventtypes.resolver';
import { PermissionResolver } from './shared/resolvers/permission.resolver';

import { HasChangesGuard } from '../core/has-changes.guard';

const routes: Routes = [
  { path: 'new', component: NewEventSelectionComponent },
  {
    path: 'new/:uiMode',
    component: NewEventFormComponent,
    pathMatch: 'full',
    canDeactivate: [HasChangesGuard],
    resolve: {
      eventTypes: EventTypesResolver,
      permission: PermissionResolver
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
      {
        path: 'overview',
        component: EventOverviewComponent,
        resolve: {
          event: EventResolver
        },
      },
      {
        path: 'products',
        component: ProductOverviewComponent,
        resolve: {
          products: ProductsResolver
        }
      },
      {
        path: 'edit',
        component: EditEventComponent,
        canDeactivate: [HasChangesGuard],
        resolve: {
          event: EventResolver,
          eventTypes: EventTypesResolver
        },
      },
      {
        path: 'close',
        component: CloseFormContainerComponent,
        resolve: {
          event: EventResolver,
          transfers: TransfersResolver
        },
      },
      {
        path: 'inventory',
        component: EventInventoryComponent
      },
      {
        path: 'count/:mode',
        component: CountFormContainerComponent,
        canDeactivate: [HasChangesGuard],
        resolve: {
          products: ProductsResolver,
          inventory: InventoryResolver,
          transfers: TransfersResolver
        },
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
    EventTypesResolver,
    PermissionResolver,
    InventoryResolver
  ]
})
export class EventRoutingModule { }
