import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ImageUploadModalComponent } from './image-upload-modal/image-upload-modal.component';

import { ProductSizesTableComponent } from './product-sizes-table/product-sizes-table.component';
import { ProductSizeCreateModalComponent } from './product-sizes-table/product-size-create-modal/product-size-create-modal.component';
import { ProductSizeEditModalComponent } from './product-sizes-table/product-size-edit-modal/product-size-edit-modal.component';
import { ProductSizeDeleteModalComponent } from './product-sizes-table/product-size-delete-modal/product-size-delete-modal.component';
import { ProductSizeFormComponent } from './product-sizes-table/product-size-form/product-size-form.component';

const modals = [
  ImageUploadModalComponent,
  ProductSizeCreateModalComponent,
  ProductSizeEditModalComponent,
  ProductSizeDeleteModalComponent
];

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
    ProductSizeFormComponent,
    ...modals
  ],
  entryComponents: [...modals]
})
export class ProductsModule { }
