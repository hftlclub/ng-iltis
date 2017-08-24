import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    console.log(this.product);
  }

}
