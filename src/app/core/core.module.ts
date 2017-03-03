import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { PageScrollConfig, Ng2PageScrollModule } from 'ng2-page-scroll';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';

import { HasChangesGuard } from './has-changes.guard';
import { ProductService } from './product.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [
    SimpleNotificationsModule,
    DropdownModule
  ],
  providers: [
    HasChangesGuard,
    ProductService,
    ProductResolver,
    ProductsResolver
  ]
})
export class CoreModule {
  constructor() {
    PageScrollConfig.defaultScrollOffset = 70;
    PageScrollConfig.defaultDuration = 500;
  }
}
