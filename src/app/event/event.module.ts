import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';

import { ProductCardComponent } from './product-card/product-card.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalTestComponent } from './modal-test/modal-test.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    EventRoutingModule
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent,
    ModalTestComponent,
    ProductOverviewComponent,
    TransferFormComponent
  ]
})
export class EventModule { }
