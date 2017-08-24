import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitFormComponent } from './unit-form/unit-form.component';
import { UnitDeleteModalComponent } from './unit-delete-modal/unit-delete-modal.component';
import { UnitCreateModalComponent } from './unit-create-modal/unit-create-modal.component';
import { UnitEditModalComponent } from './unit-edit-modal/unit-edit-modal.component';

const modals = [
  UnitDeleteModalComponent,
  UnitCreateModalComponent,
  UnitEditModalComponent
]

@NgModule({
  imports: [
    CommonModule,
    UnitsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    UnitListComponent,
    UnitFormComponent,
    ...modals,
  ],
  entryComponents: [...modals]
})
export class UnitsModule { }
