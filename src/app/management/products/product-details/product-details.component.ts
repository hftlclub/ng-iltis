import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Product } from '../../../shared/models/product';
import { ImageUploadModalComponent } from '../image-upload-modal/image-upload-modal.component';

@Component({
  selector: 'il-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute, private modalService: BsModalService) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    console.log(this.product);
  }

  showUploadModal() {
    const modal = this.modalService.show(ImageUploadModalComponent);
    modal.content.product = this.product;
  }

}
