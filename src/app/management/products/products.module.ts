import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSizesTableComponent } from './product-sizes-table/product-sizes-table.component';
import { ImageUploadModalComponent } from './image-upload-modal/image-upload-modal.component';

const modals = [ImageUploadModalComponent];

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductSizesTableComponent,
    ...modals

  ],
  entryComponents: [...modals]
})
export class ProductsModule { }
