import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';

import { CrateType } from '../../../shared/models/cratetype';
import { SizeType } from '../../../shared/models/sizetype';
import { SizesService } from '../../shared/sizes.service';

@Component({
  selector: 'il-crate-type-edit-modal',
  templateUrl: './crate-type-edit-modal.component.html',
  styleUrls: ['./crate-type-edit-modal.component.css']
})
export class CrateTypeEditModalComponent implements OnInit {

  crateType: CrateType;
  loading = false;
  sizeTypes$: Observable<SizeType[]>

  constructor(private modal: BsModalRef, private ss: SizesService, private ns: NotificationsService) { }

  ngOnInit() {
    this.sizeTypes$ = this.ss.getAllSizeTypes();
  }

  updateCrateType(crateType: CrateType) {
    this.loading = true;
    this.ss.updateCrateType(this.crateType.id, crateType).subscribe(() => {
      this.loading = false;
      this.ns.success('Kastengröße bearbeitet', 'Die Größe wurde bearbeitet.')
      this.ss.crateTypeListChanged.emit();
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
