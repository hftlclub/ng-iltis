import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../../shared/models/product';
import { Size } from '../../../../shared/models/size';
import { ProductService } from '../../../../core/product.service';

@Component({
  selector: 'il-product-size-create-modal',
  templateUrl: './product-size-create-modal.component.html',
  styleUrls: ['./product-size-create-modal.component.css']
})
export class ProductSizeCreateModalComponent {

  product: Product;
  loading = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) { }

  createSize(size: Size) {
    this.loading = true;
    this.ps.createSizeForProduct(this.product.id, size).subscribe(() => {
      this.loading = false;
      this.ns.success('Größe hinzugefügt', 'Gebindegröße für das Produkt wurde hinzugefügt.')
      this.ps.productUpdated.emit();
      this.hideModal();
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Vorgang abgebrochen');
    });
  }

  hideModal() {
    this.modal.hide();
  }

}
