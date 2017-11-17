import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'il-image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.scss']
})
export class ImageUploadModalComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  product: Product;
  loading = false;

  imageData: any;
  file: File;

  private reader: FileReader;

  constructor(private modal: BsModalRef, private ps: ProductService, private ns: NotificationsService) { }

  ngOnInit() {
    this.reader = new FileReader();
    this.reader.onload = (e) => this.imageData = e.target['result'];
  }

  imageSelected(file: File) {
    this.reader.readAsDataURL(file);
    this.file = file;
  }

  upload() {
    this.ps.uploadProductImage(this.file, this.product.id).subscribe(e => {
      this.ps.productUpdated.emit();
      this.ns.success('Bild aktualisiert', 'Das Produktbild wurde aktualisiert.');
      this.hideModal();
    },
    err => {
      this.ns.error('Fehler', 'Vorgang abgebrochen');
    });
  }

  hideModal() {
    this.modal.hide();
  }
}
