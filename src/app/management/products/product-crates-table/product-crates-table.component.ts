import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';

import { ProductService } from '../../../core/product.service';
import { CrateType } from '../../../shared/models/cratetype';
import { Product } from '../../../shared/models/product';
import { ProductCrateDeleteModalComponent } from './product-crate-delete-modal/product-crate-delete-modal.component';

@Component({
  selector: 'il-product-crates-table',
  templateUrl: './product-crates-table.component.html',
  styleUrls: ['./product-crates-table.component.css']
})
export class ProductCratesTableComponent implements OnInit {
  @Input() product: Product;
  createFormVisible = false;

  constructor(private modalService: BsModalService, private ps: ProductService) {}

  ngOnInit() {
    this.ps.productUpdated.subscribe(() => (this.createFormVisible = false));
  }

  showCrateDeleteModal(crateType: CrateType) {
    const modal = this.modalService.show(ProductCrateDeleteModalComponent);
    modal.content.product = this.product;
    modal.content.crateType = crateType;
  }
}
