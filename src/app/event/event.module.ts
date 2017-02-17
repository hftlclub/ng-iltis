import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';

import { ProductCardComponent } from './product-card/product-card.component';
import { EventComponent } from './event/event.component';
import { HistorySidebarComponent } from './history-sidebar/history-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule
  ],
  declarations: [
    ProductCardComponent,
    EventComponent,
    HistorySidebarComponent
  ]
})
export class EventModule { }
