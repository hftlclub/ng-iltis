import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { CrateType } from '../../../shared/models/cratetype';
import { SizesService } from '../../shared/sizes.service';
import { CrateTypeCreateModalComponent } from '../crate-type-create-modal/crate-type-create-modal.component';
import { CrateTypeEditModalComponent } from '../crate-type-edit-modal/crate-type-edit-modal.component';
import { CrateTypeDeleteModalComponent } from '../crate-type-delete-modal/crate-type-delete-modal.component';

@Component({
  selector: 'il-crate-types',
  templateUrl: './crate-types.component.html',
  styleUrls: ['./crate-types.component.css']
})
export class CrateTypesComponent implements OnInit {

  crateTypes$: Observable<CrateType[]>;

  constructor(private ss: SizesService, private modalService: BsModalService) { }

  ngOnInit() {
    this.refreshSizeTypes();
    this.ss.crateTypeListChanged.subscribe(() => this.refreshSizeTypes());
  }

  refreshSizeTypes() {
    this.crateTypes$ = this.ss.getAllCrateTypes().pipe(
      map(cts => cts.sort((a, b) => a.id - b.id))
    );
  }

  showDeleteModal(ct: CrateType) {
    const modal = this.modalService.show(CrateTypeDeleteModalComponent);
    modal.content.crateType = ct;
  }

  showEditModal(ct: CrateType) {
    const modal = this.modalService.show(CrateTypeEditModalComponent);
    modal.content.crateType = ct;
  }

  showCreateModal() {
    this.modalService.show(CrateTypeCreateModalComponent);
  }

}
