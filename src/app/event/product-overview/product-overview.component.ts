import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {
  categories: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const products = this.route.snapshot.data.products;
    const categories = {};

    /* `products` is a list of products each with one category assigned.
    transform this to a list of categories each with a list of assigned products */
    products.forEach((p: Product) => {
      const key = p.category.id;
      if (!categories.hasOwnProperty(key)) {
        categories[key] = p.category;
        categories[key].products = [];
      }

      categories[key].products.push(p);
    });
    this.categories = Object.keys(categories).map(k => categories[k]);
  }
}
