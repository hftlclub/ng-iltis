import { switchMap } from 'rxjs/operators';
import { ProductActivationModalComponent } from '../product-activation-modal/product-activation-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../../core/product.service';
import { Product } from '../../../shared/models/product';
import { ImageUploadModalComponent } from '../image-upload-modal/image-upload-modal.component';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

@Component({
  selector: 'il-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: Product;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private ps: ProductService) { }

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.subscription = this.ps.productUpdated.pipe(
      switchMap(() => this.ps.getSingle(this.product.id, this.route.snapshot.data.showInactiveSizes))
    ).subscribe(p => this.product = p);
  }

  get hasActiveSizes(): boolean {
    return this.product.sizes.some(s => s.active);
  }

  showUploadModal() {
    const modal = this.modalService.show(ImageUploadModalComponent);
    modal.content.product = this.product;
  }

  showDeleteModal() {
    const modal = this.modalService.show(ProductDeleteModalComponent);
    modal.content.product = this.product;
  }

  showActivationModal(activation: boolean = true) {
    const modal = this.modalService.show(ProductActivationModalComponent);
    modal.content.product = this.product;
    modal.content.activation = activation;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
