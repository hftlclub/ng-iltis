import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';

import { SizeType } from '../../../shared/models/sizetype';
import { SizesService } from '../../shared/sizes.service';

@Component({
  selector: 'il-size-type-edit-modal',
  templateUrl: './size-type-edit-modal.component.html',
  styleUrls: ['./size-type-edit-modal.component.css']
})
export class SizeTypeEditModalComponent {

  sizeType: SizeType;
  loading = false;

  constructor(private modal: BsModalRef, private ss: SizesService, private ns: NotificationsService) { }

  updateSizeType(sizeType: SizeType) {
    this.loading = true;
    this.ss.updateSizeType(this.sizeType.id, sizeType).subscribe(() => {
      this.loading = false;
      this.ns.success('Einheit bearbeitet', 'Die Einheit wurde bearbeitet.')
      this.ss.sizeTypeListChanged.emit();
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
