import { Unit } from '../../../shared/models/unit';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { UnitsService } from '../../shared/units.service';

@Component({
  selector: 'il-unit-create-modal',
  templateUrl: './unit-create-modal.component.html',
  styleUrls: ['./unit-create-modal.component.css']
})
export class UnitCreateModalComponent {

  loading = false;

  constructor(private modal: BsModalRef, private us: UnitsService, private ns: NotificationsService) { }

  createUnit(unit: Unit) {
    this.loading = true;
    this.us.create(unit).subscribe(() => {
      this.loading = false;
      this.ns.success('Einheit hinzugefügt', 'Die Einheit wurde hinzugefügt.');
      this.us.unitListChanged.emit();
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
