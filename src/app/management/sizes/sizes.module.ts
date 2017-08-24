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

const modals = [
  UnitDeleteModalComponent,
  UnitCreateModalComponent,
  UnitEditModalComponent
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
    ...modals,
  ],
  entryComponents: [...modals]
})
export class SizesModule { }
