import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Product } from '../../../shared/models/product';
import { UploadService } from '../../../core/upload.service';

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

  constructor(private modal: BsModalRef, private us: UploadService) { }

  ngOnInit() {
    this.reader = new FileReader();
    this.reader.onload = (e) => this.imageData = e.target['result'];
  }

  imageSelected(file: File) {
    this.reader.readAsDataURL(file);
    this.file = file;
  }

  upload() {
    this.us.uploadFile(this.file).subscribe(e => console.log(e));
  }

  hideModal() {
    this.modal.hide();
  }
}
