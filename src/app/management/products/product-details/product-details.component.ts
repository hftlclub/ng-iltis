import { ProductService } from '../../../core/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import 'rxjs/add/operator/switchMap';

import { Product } from '../../../shared/models/product';
import { ImageUploadModalComponent } from '../image-upload-modal/image-upload-modal.component';

@Component({
  selector: 'il-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private ps: ProductService) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  showUploadModal() {
    const modal = this.modalService.show(ImageUploadModalComponent);
    modal.content.product = this.product;
    modal.content.updated
      .switchMap(() => this.ps.getSingle(this.product.id))
      .subscribe(p => this.product = p);
  }

}
