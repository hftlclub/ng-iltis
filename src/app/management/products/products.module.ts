import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ImageUploadModalComponent } from './image-upload-modal/image-upload-modal.component';
import { ProductActivationModalComponent } from './product-activation-modal/product-activation-modal.component';

import { ProductSizesTableComponent } from './product-sizes-table/product-sizes-table.component';
import { ProductSizeCreateModalComponent } from './product-sizes-table/product-size-create-modal/product-size-create-modal.component';
import { ProductSizeEditModalComponent } from './product-sizes-table/product-size-edit-modal/product-size-edit-modal.component';
import { ProductSizeDeleteModalComponent } from './product-sizes-table/product-size-delete-modal/product-size-delete-modal.component';
import { ProductSizeFormComponent } from './product-sizes-table/product-size-form/product-size-form.component';
import { ProductDeleteModalComponent } from './product-delete-modal/product-delete-modal.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductSearchFilterComponent } from './product-search-filter/product-search-filter.component';

import { ProductListFilterService } from './shared/product-list-filter.service';
import { ProductCratesTableComponent } from './product-crates-table/product-crates-table.component';
import { ProductCrateDeleteModalComponent } from './product-crates-table/product-crate-delete-modal/product-crate-delete-modal.component';
import { ProductCrateCreateComponent } from './product-crates-table/product-crate-create/product-crate-create.component';
import { ProductGroupFilterComponent } from './product-group-filter/product-group-filter.component';
import { ProductCategoryFilterComponent } from './product-category-filter/product-category-filter.component';

const modals = [
  ImageUploadModalComponent,
  ProductSizeCreateModalComponent,
  ProductSizeEditModalComponent,
  ProductSizeDeleteModalComponent,
  ProductDeleteModalComponent,
  ProductCrateDeleteModalComponent,
  ProductActivationModalComponent
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
    ProductCreateComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductSearchFilterComponent,
    ProductCratesTableComponent,
    ProductCrateCreateComponent,
    ProductGroupFilterComponent,
    ProductCategoryFilterComponent,
    ...modals
  ],
  entryComponents: [...modals],
  providers: [ProductListFilterService]
})
export class ProductsModule { }
