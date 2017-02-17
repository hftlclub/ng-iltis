import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newArray(num) {
    return new Array(num);
  }

}
