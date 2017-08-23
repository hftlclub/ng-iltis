import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitsService } from './shared/units.service';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitFormComponent } from './unit-form/unit-form.component';

@NgModule({
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule
  ],
  declarations: [UnitListComponent, UnitFormComponent],
  providers: [UnitsService]
})
export class UnitsModule { }
