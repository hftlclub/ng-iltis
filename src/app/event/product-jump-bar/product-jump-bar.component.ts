import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-product-jump-bar',
  templateUrl: './product-jump-bar.component.html',
  styleUrls: ['./product-jump-bar.component.css']
})
export class ProductJumpBarComponent {
  @Input() categories;
}
