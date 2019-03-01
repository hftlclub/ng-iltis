import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryDeleteModalComponent } from './category-delete-modal/category-delete-modal.component';
import { CategoryEditModalComponent } from './category-edit-modal/category-edit-modal.component';
import { CategoryCreateModalComponent } from './category-create-modal/category-create-modal.component';

const modals = [CategoryCreateModalComponent, CategoryEditModalComponent, CategoryDeleteModalComponent];

@NgModule({
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
  declarations: [CategoryListComponent, CategoryFormComponent, ...modals],
  entryComponents: [...modals]
})
export class CategoriesModule {}
