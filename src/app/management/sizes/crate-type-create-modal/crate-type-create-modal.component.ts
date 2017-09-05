import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

import { SizeType } from '../../../shared/models/sizetype';
import { CrateType } from '../../../shared/models/cratetype';
import { SizesService } from '../../shared/sizes.service';

@Component({
  selector: 'il-crate-type-create-modal',
  templateUrl: './crate-type-create-modal.component.html',
  styleUrls: ['./crate-type-create-modal.component.css']
})
export class CrateTypeCreateModalComponent implements OnInit {

  loading = false;
  sizeTypes$: Observable<SizeType[]>

  constructor(private modal: BsModalRef, private ss: SizesService, private ns: NotificationsService) { }

  ngOnInit() {
    this.sizeTypes$ = this.ss.getAllSizeTypes();
  }

  createCrateType(crateType: CrateType) {
    this.loading = true;
    this.ss.createCrateType(crateType).subscribe(() => {
      this.loading = false;
      this.ns.success('Kastengröße hinzugefügt', 'Die Größe wurde hinzugefügt.');
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
