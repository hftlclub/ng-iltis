import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { SizesService } from '../../shared/sizes.service';
import { SizeType } from '../../../shared/models/sizetype';

@Component({
  selector: 'il-size-type-delete-modal',
  templateUrl: './size-type-delete-modal.component.html',
  styleUrls: ['./size-type-delete-modal.component.css']
})
export class SizeTypeDeleteModalComponent {

  sizeType: SizeType;
  loading = false;

  constructor(private modal: BsModalRef, private ss: SizesService, private ns: NotificationsService) { }

  deleteSizeType() {
    this.loading = true;
    this.ss.deleteSizeType(this.sizeType.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Gebindegröße gelöscht', 'Die Größe wurde gelöscht.')
      this.ss.sizeTypeListChanged.emit();
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
