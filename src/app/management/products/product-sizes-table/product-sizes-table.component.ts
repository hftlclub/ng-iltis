import { Size } from '../../../shared/models/size';
import { Component, Input } from '@angular/core';

import { Unit } from '../../../shared/models/unit';

@Component({
  selector: 'il-product-sizes-table',
  templateUrl: './product-sizes-table.component.html',
  styleUrls: ['./product-sizes-table.component.css']
})
export class ProductSizesTableComponent {

  @Input() sizes: Size[];
  @Input() unit: Unit;

}
