import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { ProductService } from '../../../../core/product.service';
import { CrateType } from '../../../../shared/models/cratetype';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'il-product-crate-delete-modal',
  templateUrl: './product-crate-delete-modal.component.html',
  styleUrls: ['./product-crate-delete-modal.component.css']
})
export class ProductCrateDeleteModalComponent {
  crateType: CrateType;
  product: Product;
  loading = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) {}

  deleteCrate() {
    this.loading = true;
    this.ps.deleteCrateTypeForProduct(this.product.id, this.crateType.id).subscribe(
      () => {
        this.loading = false;
        this.ns.success('Kasten entfernt', 'Der Kasten für das Produkt wurde entfernt.');
        this.ps.productUpdated.emit();
        this.hideModal();
      },
      err => {
        this.loading = false;
        this.ns.error('Fehler', 'Vorgang abgebrochen');
      }
    );
  }

  hideModal() {
    this.modal.hide();
  }
}
