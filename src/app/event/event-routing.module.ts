import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from './event/event.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

const routes: Routes = [
  {
    path: 'event',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductOverviewComponent },
      { path: 'newtransfer', component: TransferFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EventRoutingModule { }
