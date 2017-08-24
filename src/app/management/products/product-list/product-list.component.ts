import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.products = this.route.snapshot.data.products;
  }

}
