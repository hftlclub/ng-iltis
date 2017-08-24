import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SizesRoutingModule } from './sizes-routing.module';
import { SizesComponent } from './sizes/sizes.component';
import { SizeTypesComponent } from './size-types/size-types.component';
import { CrateTypesComponent } from './crate-types/crate-types.component';

const modals = [];

@NgModule({
  imports: [
    CommonModule,
    SizesRoutingModule,
    SharedModule
  ],
  declarations: [
    SizesComponent,
    ...modals,
    SizeTypesComponent,
    CrateTypesComponent
  ],
  entryComponents: [...modals]
})
export class SizesModule { }
