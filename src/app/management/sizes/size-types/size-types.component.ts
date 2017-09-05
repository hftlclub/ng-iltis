import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';

import { SizeType } from '../../../shared/models/sizetype';
import { SizesService } from '../../shared/sizes.service';

@Component({
  selector: 'il-size-types',
  templateUrl: './size-types.component.html',
  styleUrls: ['./size-types.component.css']
})
export class SizeTypesComponent implements OnInit {

    sizeTypes$: Observable<SizeType[]>

    constructor(private ss: SizesService, private modalService: BsModalService) { }

    ngOnInit() {
      this.refreshSizeTypes();
      this.ss.sizeTypeListChanged.subscribe(() => this.refreshSizeTypes())
    }

    refreshSizeTypes() {
      this.sizeTypes$ = this.ss.getAllSizeTypes();
    }

    showDeleteModal(st: SizeType) {
      /*const modal = this.modalService.show(UnitDeleteModalComponent);
      modal.content.unit = unit;*/
    }

    showEditModal(st: SizeType) {
      /*const modal = this.modalService.show(UnitEditModalComponent);
      modal.content.unit = unit;*/
    }

    showCreateModal() {
      /*this.modalService.show(UnitCreateModalComponent);*/
    }

  }
