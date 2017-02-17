import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() gridWidth = 3;

  constructor() { }

  ngOnInit() {
  }

}
