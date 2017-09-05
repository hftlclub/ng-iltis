import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';

import { UnitsService } from '../../shared/units.service';
import { Unit } from '../../../shared/models/unit';
import { UnitDeleteModalComponent } from '../unit-delete-modal/unit-delete-modal.component';
import { UnitCreateModalComponent } from '../unit-create-modal/unit-create-modal.component';
import { UnitEditModalComponent } from '../unit-edit-modal/unit-edit-modal.component';


@Component({
  selector: 'il-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  units$: Observable<Unit[]>

  constructor(private us: UnitsService, private modalService: BsModalService) { }

  ngOnInit() {
    this.refreshUnits();
    this.us.unitListChanged.subscribe(() => this.refreshUnits())
  }

  refreshUnits() {
    this.units$ = this.us.getAll();
  }

  showDeleteModal(unit: Unit) {
    const modal = this.modalService.show(UnitDeleteModalComponent);
    modal.content.unit = unit;
  }

  showEditModal(unit: Unit) {
    const modal = this.modalService.show(UnitEditModalComponent);
    modal.content.unit = unit;
  }

  showCreateModal() {
    this.modalService.show(UnitCreateModalComponent);
  }

}
