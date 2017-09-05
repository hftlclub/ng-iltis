import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../../shared/models/product';
import { Size } from '../../../../shared/models/size';
import { ProductService } from '../../../../core/product.service';

@Component({
  selector: 'il-product-size-edit-modal',
  templateUrl: './product-size-edit-modal.component.html',
  styleUrls: ['./product-size-edit-modal.component.css']
})
export class ProductSizeEditModalComponent {

  product: Product;
  size: Size;
  loading = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) { }

  updateSize(size: Size) {
    this.loading = true;
    this.ps.updateSizeForProduct(this.product.id, this.size.sizeType.id, size).subscribe(() => {
      this.loading = false;
      this.ns.success('Größe bearbeitet', 'Gebindegröße für das Produkt wurde bearbeitet.')
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
