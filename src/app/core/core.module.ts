import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { PageScrollConfig, Ng2PageScrollModule } from 'ng2-page-scroll';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { HasChangesGuard } from './has-changes.guard';
import { ProductService } from './product.service';
import { GlobalService } from './global.service';
import { UploadService } from './upload.service';
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
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [
    SimpleNotificationsModule,
    BsDropdownModule
  ],
  providers: [
    HasChangesGuard,
    ProductService,
    GlobalService,
    UploadService,
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
