import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { UnitsService } from '../shared/units.service';
import { Unit } from '../../../shared/models/unit';

@Component({
  selector: 'il-unit-delete-modal',
  templateUrl: './unit-delete-modal.component.html',
  styleUrls: ['./unit-delete-modal.component.css']
})
export class UnitDeleteModalComponent {

  unit: Unit;
  loading = false;

  constructor(private modal: BsModalRef, private us: UnitsService, private ns: NotificationsService) { }

  deleteUnit() {
    this.loading = true;
    this.us.delete(this.unit.id).subscribe(() => {
      this.loading = false;
      this.ns.success('Einheit gelöscht', 'Die Einheit wurde gelöscht.')
      this.us.unitListChanged.emit();
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
