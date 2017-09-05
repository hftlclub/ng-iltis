import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SizesRoutingModule } from './sizes-routing.module';
import { SizesComponent } from './sizes/sizes.component';
import { SizeTypesComponent } from './size-types/size-types.component';
import { CrateTypesComponent } from './crate-types/crate-types.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitDeleteModalComponent } from './unit-delete-modal/unit-delete-modal.component';
import { UnitCreateModalComponent } from './unit-create-modal/unit-create-modal.component';
import { UnitEditModalComponent } from './unit-edit-modal/unit-edit-modal.component';
import { SizeTypeFormComponent } from './size-type-form/size-type-form.component';
import { SizeTypeDeleteModalComponent } from './size-type-delete-modal/size-type-delete-modal.component';
import { SizeTypeCreateModalComponent } from './size-type-create-modal/size-type-create-modal.component';
import { SizeTypeEditModalComponent } from './size-type-edit-modal/size-type-edit-modal.component';
import { CrateTypeFormComponent } from './crate-type-form/crate-type-form.component';
import { CrateTypeDeleteModalComponent } from './crate-type-delete-modal/crate-type-delete-modal.component';
import { CrateTypeCreateModalComponent } from './crate-type-create-modal/crate-type-create-modal.component';
import { CrateTypeEditModalComponent } from './crate-type-edit-modal/crate-type-edit-modal.component';

const modals = [
  UnitDeleteModalComponent,
  UnitCreateModalComponent,
  UnitEditModalComponent,
  SizeTypeDeleteModalComponent,
  SizeTypeCreateModalComponent,
  SizeTypeEditModalComponent,
  CrateTypeDeleteModalComponent,
  CrateTypeCreateModalComponent,
  CrateTypeEditModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    SizesRoutingModule,
    SharedModule
  ],
  declarations: [
    SizesComponent,
    SizeTypesComponent,
    CrateTypesComponent,
    UnitListComponent,
    UnitFormComponent,
    SizeTypeFormComponent,
    CrateTypeFormComponent,
    ...modals,
  ],
  entryComponents: [...modals]
})
export class SizesModule { }
