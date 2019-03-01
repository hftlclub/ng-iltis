import { UnitsService } from '../../shared/units.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { SizeType } from '../../../shared/models/sizetype';
import { SizesService } from '../../shared/sizes.service';
import { Unit } from '../../../shared/models/unit';

@Component({
  selector: 'il-size-type-create-modal',
  templateUrl: './size-type-create-modal.component.html',
  styleUrls: ['./size-type-create-modal.component.css']
})
export class SizeTypeCreateModalComponent implements OnInit {
  loading = false;
  units$: Observable<Unit[]>;

  constructor(
    private modal: BsModalRef,
    private ss: SizesService,
    private ns: NotificationsService,
    private us: UnitsService
  ) {}

  ngOnInit() {
    this.units$ = this.us.getAll();
  }

  createSizeType(sizeType: SizeType) {
    this.loading = true;
    this.ss.createSizeType(sizeType).subscribe(
      () => {
        this.loading = false;
        this.ns.success('Einheit hinzugefügt', 'Die Einheit wurde hinzugefügt.');
        this.ss.sizeTypeListChanged.emit();
        this.hideModal();
      },
      err => {
        this.loading = false;
        this.ns.error('Fehler', 'Vorgang abgebrochen');
      }
    );
  }

  hideModal() {
    this.modal.hide();
  }
}
