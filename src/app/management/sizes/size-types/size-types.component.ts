import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';

import { SizeType } from '../../../shared/models/sizetype';
import { SizesService } from '../../shared/sizes.service';
import { SizeTypeCreateModalComponent } from '../size-type-create-modal/size-type-create-modal.component';
import { SizeTypeEditModalComponent } from '../size-type-edit-modal/size-type-edit-modal.component';
import { SizeTypeDeleteModalComponent } from '../size-type-delete-modal/size-type-delete-modal.component';

@Component({
  selector: 'il-size-types',
  templateUrl: './size-types.component.html',
  styleUrls: ['./size-types.component.css']
})
export class SizeTypesComponent implements OnInit {

    sizeTypes$: Observable<SizeType[]>;

    constructor(private ss: SizesService, private modalService: BsModalService) { }

    ngOnInit() {
      this.refreshSizeTypes();
      this.ss.sizeTypeListChanged.subscribe(() => this.refreshSizeTypes());
    }

    refreshSizeTypes() {
      this.sizeTypes$ = this.ss.getAllSizeTypes().pipe(
        map(sts => sts.sort((a, b) => a.id - b.id))
      );
    }

    showDeleteModal(st: SizeType) {
      const modal = this.modalService.show(SizeTypeDeleteModalComponent);
      modal.content.sizeType = st;
    }

    showEditModal(st: SizeType) {
      const modal = this.modalService.show(SizeTypeEditModalComponent);
      modal.content.sizeType = st;
    }

    showCreateModal() {
      this.modalService.show(SizeTypeCreateModalComponent);
    }

  }
