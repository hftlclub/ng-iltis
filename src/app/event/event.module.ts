import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { PageScrollConfig } from 'ng2-page-scroll';

import { EventRoutingModule } from './event-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { CounterControlComponent } from './counter-control/counter-control.component';
import { ProductService } from './shared/product.service';
import { EventService } from './shared/event.service';
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductJumpBarComponent } from './product-jump-bar/product-jump-bar.component';
import { NewEventFormComponent } from './new-event-form/new-event-form.component';
import { AbsPipe } from './shared/abs.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    EventRoutingModule,
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent,
    ProductOverviewComponent,
    TransferFormComponent,
    CounterControlComponent,
    ProductGroupComponent,
    ProductJumpBarComponent,
    NewEventFormComponent,
    AbsPipe
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
