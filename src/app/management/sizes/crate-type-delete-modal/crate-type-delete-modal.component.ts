import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { SizesService } from '../../shared/sizes.service';
import { CrateType } from '../../../shared/models/cratetype';

@Component({
  selector: 'il-crate-type-delete-modal',
  templateUrl: './crate-type-delete-modal.component.html',
  styleUrls: ['./crate-type-delete-modal.component.css']
})
export class CrateTypeDeleteModalComponent {

  crateType: CrateType;
  loading = false;

  constructor(private modal: BsModalRef, private ss: SizesService, private ns: NotificationsService) { }

  deleteSizeType() {
    this.loading = true;
    this.ss.deleteCrateType(this.crateType.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Kastengröße gelöscht', 'Die Größe wurde gelöscht.')
      this.ss.crateTypeListChanged.emit();
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
