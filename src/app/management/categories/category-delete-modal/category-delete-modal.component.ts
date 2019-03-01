import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { Category } from '../../../shared/models/category';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'il-category-delete-modal',
  templateUrl: './category-delete-modal.component.html',
  styleUrls: ['./category-delete-modal.component.css']
})
export class CategoryDeleteModalComponent {
  category: Category;
  loading = false;

  constructor(private modal: BsModalRef, private cs: CategoriesService, private ns: NotificationsService) {}

  deleteCategory() {
    this.loading = true;
    this.cs.delete(this.category.id).subscribe(
      () => {
        this.loading = false;
        this.ns.success('Kategorie gelöscht', 'Die Kategorie wurde gelöscht.');
        this.cs.categoryListChanged.emit();
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
