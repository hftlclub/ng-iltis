import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'il-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements OnInit {

  @Input() inventory: Inventory[];

  constructor() { }

  ngOnInit() {
  }

}
