import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EventRoutingModule } from './event-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { ModalTestComponent } from './modal-test/modal-test.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { ProductService } from './shared/product.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    EventRoutingModule
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent,
    ModalTestComponent,
    ProductOverviewComponent,
    TransferFormComponent,
    CounterControlComponent
  ],
  providers: [
    ProductService
  ]
})
export class EventModule { }
