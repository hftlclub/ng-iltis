import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-product-group',
  templateUrl: './product-group.component.html'
})
export class ProductGroupComponent {
  @Input() category;
}
