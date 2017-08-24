import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { Unit } from '../../../shared/models/unit';
import { UnitsService } from '../shared/units.service';

@Component({
  selector: 'il-unit-edit-modal',
  templateUrl: './unit-edit-modal.component.html',
  styleUrls: ['./unit-edit-modal.component.css']
})
export class UnitEditModalComponent {

  unit: Unit;
  loading = false;

  constructor(private modal: BsModalRef, private us: UnitsService, private ns: NotificationsService) { }

  updateUnit(unit: Unit) {
    this.loading = true;
    this.us.update(this.unit.id, unit).subscribe(() => {
      this.loading = false;
      this.ns.success('Einheit bearbeitet', 'Die Einheit wurde bearbeitet.')
      this.us.unitListChanged.emit();
      this.hideModal();
    });
  }

  hideModal() {
    this.modal.hide();
  }

}
