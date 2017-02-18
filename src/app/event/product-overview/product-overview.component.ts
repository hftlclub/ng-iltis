import { Component, OnInit } from '@angular/core';

import { ProductService } from './../shared/product.service';
import { Product } from '../shared/models/product/product';

@Component({
  selector: 'il-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  categories: any;

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.ps.getAll().subscribe(res => {
      const categories = {};

      res.forEach(p => {
        const key = p.category.id;
        if (!categories.hasOwnProperty(key)) {
          categories[key] = p.category;
          categories[key].products = [];
        };

        categories[key].products.push(p);
      });
      this.categories = Object.keys(categories).map(k => categories[k]);
    });
  }

}
