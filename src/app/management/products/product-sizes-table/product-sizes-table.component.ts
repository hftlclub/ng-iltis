import { Component, Input, OnChanges } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Size } from '../../../shared/models/size';
import { Product } from '../../../shared/models/product';
import { Unit } from '../../../shared/models/unit';
import { ProductSizeCreateModalComponent } from './product-size-create-modal/product-size-create-modal.component';
import { ProductSizeEditModalComponent } from './product-size-edit-modal/product-size-edit-modal.component';
import { ProductSizeDeleteModalComponent } from './product-size-delete-modal/product-size-delete-modal.component';

@Component({
  selector: 'il-product-sizes-table',
  templateUrl: './product-sizes-table.component.html',
  styleUrls: ['./product-sizes-table.component.css']
})
export class ProductSizesTableComponent implements OnChanges {

  @Input() product: Product;
  sizesSorted: Size[] = [];

  constructor(private modalService: BsModalService) { }

  ngOnChanges() {
    this.sizesSorted = this.product.sizes.sort((a, b) => a.active ? -1 : 1);
  }

  showSizeCreateModal() {
    const modal = this.modalService.show(ProductSizeCreateModalComponent);
    modal.content.product = this.product;
  }

  showSizeEditModal(size: Size) {
    const modal = this.modalService.show(ProductSizeEditModalComponent);
    modal.content.product = this.product;
    modal.content.size = size;
  }

  showSizeDeleteModal(size: Size) {
    const modal = this.modalService.show(ProductSizeDeleteModalComponent);
    modal.content.product = this.product;
    modal.content.size = size;
  }

}
