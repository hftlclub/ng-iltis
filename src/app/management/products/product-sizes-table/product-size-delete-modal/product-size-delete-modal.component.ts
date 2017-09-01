import { ProductService } from '../../../../core/product.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../../shared/models/product';
import { Size } from '../../../../shared/models/size';

@Component({
  selector: 'il-product-size-delete-modal',
  templateUrl: './product-size-delete-modal.component.html',
  styleUrls: ['./product-size-delete-modal.component.css']
})
export class ProductSizeDeleteModalComponent {

  size: Size;
  product: Product;
  loading = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) { }

  deleteSize() {
    this.loading = true;
    this.ps.deleteSizeForProduct(this.product.id, this.size.sizeType.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Zuordnung entfernt', 'Die Größe für das Produkt wurde entfernt.')
      this.ps.productUpdated.emit();
      this.hideModal();
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Vorgang abgebrochen');
      this.hideModal();
    });
  }

  hideModal() {
    this.modal.hide();
  }

}
