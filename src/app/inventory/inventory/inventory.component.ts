import { Observable } from 'rxjs';
import { Inventory } from './../../shared/models/inventory/inventory';
import { InventoryService } from '../shared/inventory.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory$: Observable<Inventory[]>;

  constructor(private is: InventoryService) { }

  ngOnInit() {
    this.inventory$ = this.is.getCurrentInventory();
  }

}
