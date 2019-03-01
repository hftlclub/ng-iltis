import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { ProductService } from '../../../core/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'il-product-activation-modal',
  templateUrl: './product-activation-modal.component.html',
  styleUrls: ['./product-activation-modal.component.css']
})
export class ProductActivationModalComponent implements OnInit {
  activation: boolean;
  product: Product;
  loading = false;
  checkLoading = true;
  unused = false;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) {}

  ngOnInit() {
    setTimeout(() => {
      if (!this.activation) {
        this.startCheck();
      } // hack, necessary because product is only available asynchronously
    }, 0);
  }

  startCheck() {
    this.checkLoading = true;
    this.ps.checkUnused(this.product.id).subscribe(
      () => {
        this.unused = true;
        this.checkLoading = false;
      }, // success
      () => {
        this.unused = false;
        this.checkLoading = false;
      } // error
    );
  }

  setProductActive(activation: boolean) {
    this.loading = true;
    this.ps.setActive(this.product.id, activation).subscribe(
      () => {
        this.loading = false;
        let notifTitle;
        let notifText;
        if (activation) {
          notifTitle = 'Produkt aktiviert';
          notifText = 'Das Produkt wurde aktiviert.';
        } else {
          notifTitle = 'Produkt deaktiviert';
          notifText = 'Das Produkt wurde deaktiviert.';
        }
        this.ns.success(notifTitle, notifText);
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
