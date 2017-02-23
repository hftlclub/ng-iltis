import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { PageScrollConfig, Ng2PageScrollModule } from 'ng2-page-scroll';
import { ModalModule } from 'ng2-bootstrap/modal';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

import { HasChangesGuard } from './has-changes.guard';
import { ProductService } from './product.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductResolver } from './resolvers/product.resolver';

@NgModule({
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    ModalModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  exports: [
    SimpleNotificationsModule
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
