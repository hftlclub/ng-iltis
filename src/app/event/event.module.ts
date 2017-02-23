import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { PageScrollConfig } from 'ng2-page-scroll';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { EventRoutingModule } from './event-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormContainerComponent } from './transfer-form-container/transfer-form-container.component';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { ProductService } from './shared/product.service';
import { EventService } from './shared/event.service';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductJumpBarComponent } from './product-jump-bar/product-jump-bar.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { AbsPipe } from './shared/abs.pipe';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { EventListComponent } from './event-list/event-list.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { HistoryTransferItemComponent } from './history-transfer-item/history-transfer-item.component';
import { HistoryTransactionItemComponent } from './history-transaction-item/history-transaction-item.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { EventFormComponent } from './event-form/event-form.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    EventRoutingModule,
    Ng2PageScrollModule.forRoot(),
    DateValueAccessorModule,
    ModalModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent,
    ProductOverviewComponent,
    TransferFormContainerComponent,
    CounterControlComponent,
    ProductGroupComponent,
    ProductJumpBarComponent,
    NewEventFormComponent,
    AbsPipe,
    EventOverviewComponent,
    EventListComponent,
    HistoryTransferItemComponent,
    HistoryTransactionItemComponent,
    TransferFormComponent,
    EventFormComponent
  ],
  providers: [
    ProductService,
    EventService
  ]
})
export class EventModule {
  constructor() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;
  }
}
