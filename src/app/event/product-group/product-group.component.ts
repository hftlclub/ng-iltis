import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent {
  @Input() category;
}
