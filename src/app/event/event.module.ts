import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { EventService } from './shared/event.service';
import { AbsPipe } from './shared/abs.pipe';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { HistoryTransferItemComponent } from './history-transfer-item/history-transfer-item.component';
import { HistoryTransactionItemComponent } from './history-transaction-item/history-transaction-item.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductJumpBarComponent } from './product-jump-bar/product-jump-bar.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventOverviewComponent } from './event-overview/event-overview.component';
import { EventOverviewCardComponent } from './event-overview-card/event-overview-card.component';
import { CashModalComponent } from './cash-modal/cash-modal.component';
import { EventFormComponent } from './event-form/event-form.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { TransferFormContainerComponent } from './transfer-form-container/transfer-form-container.component';
import { CountFormComponent } from './count-form/count-form.component';
import { CountFormContainerComponent } from './count-form-container/count-form-container.component';
import { CloseFormComponent } from './close-form/close-form.component';
import { CloseFormContainerComponent } from './close-form-container/close-form-container.component';
import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DatepickerModalComponent } from './datepicker-modal/datepicker-modal.component';
import { TimepickerModalComponent } from './timepicker-modal/timepicker-modal.component';


const modals = [
  CashModalComponent,
  DeleteModalComponent,
  DatepickerModalComponent,
  TimepickerModalComponent
];

@NgModule({
  imports: [
    SharedModule,
    EventRoutingModule
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent,
    ProductOverviewComponent,
    TransferFormContainerComponent,
    ProductGroupComponent,
    ProductJumpBarComponent,
    NewEventFormComponent,
    AbsPipe,
    CounterControlComponent,
    EventOverviewComponent,
    EventListComponent,
    HistoryTransferItemComponent,
    HistoryTransactionItemComponent,
    TransferFormComponent,
    EventFormComponent,
    EditEventComponent,
    EventOverviewCardComponent,
    CountFormComponent,
    CountFormContainerComponent,
    CloseFormComponent,
    CloseFormContainerComponent,
    CheckboxControlComponent,
    ...modals
  ],
  entryComponents: [...modals],
  providers: [
    EventService
  ]
})
export class EventModule {

}
