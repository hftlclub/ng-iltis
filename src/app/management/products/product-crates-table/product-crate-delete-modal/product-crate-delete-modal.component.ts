import { CrateType } from '../../../../shared/models/cratetype';
import { ProductService } from '../../../../core/product.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../../shared/models/product';
import { Size } from '../../../../shared/models/size';

@Component({
  selector: 'il-product-crate-delete-modal',
  templateUrl: './product-crate-delete-modal.component.html',
  styleUrls: ['./product-crate-delete-modal.component.css']
})
export class ProductCrateDeleteModalComponent {

  crateType: CrateType;
  product: Product;
  loading = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) { }

  deleteCrate() {
    this.loading = true;
    this.ps.deleteCrateTypeForProduct(this.product.id, this.crateType.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Kasten entfernt', 'Der Kasten für das Produkt wurde entfernt.')
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
