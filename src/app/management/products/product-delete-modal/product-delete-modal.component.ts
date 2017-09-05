import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { ProductService } from '../../../core/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'il-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent {

  product: Product;
  loading = false;

  constructor(
    private modal: BsModalRef,
    private ps: ProductService,
    private ns: NotificationsService,
    private router: Router,
    private route: ActivatedRoute) { }


  deleteProduct() {
    this.loading = true;
    this.ps.delete(this.product.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Produkt gelöscht', 'Das Produkt wurde gelöscht.')
      this.router.navigate(['management', 'products', 'list']);
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
