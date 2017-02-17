import { Component, OnInit } from '@angular/core';

import { ProductService } from './../shared/product.service';
import { Product } from '../shared/models/product/product';

@Component({
  selector: 'il-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  products: Product[];

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.ps.getAll().subscribe(res => this.products = res);
  }

}
