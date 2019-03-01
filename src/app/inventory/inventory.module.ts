import { InventoryService } from './shared/inventory.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  imports: [CommonModule, InventoryRoutingModule, SharedModule],
  declarations: [InventoryComponent]
})
export class InventoryModule {}
