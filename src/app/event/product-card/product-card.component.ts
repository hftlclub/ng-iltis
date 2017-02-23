import { Component, OnInit, Input, Inject } from '@angular/core';

import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() gridWidth = 3;
  @Input() product: Product;

  constructor(@Inject('IMG_URL') private imgUrl) { }

  ngOnInit() {
  }

}
