import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

import { Category } from '../../../shared/models/category';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'il-category-create-modal',
  templateUrl: './category-create-modal.component.html',
  styleUrls: ['./category-create-modal.component.css']
})
export class CategoryCreateModalComponent {

  loading = false;

  constructor(private modal: BsModalRef, private cs: CategoriesService, private ns: NotificationsService) { }

  createCategory(category: Category) {
    this.loading = true;
    this.cs.create(category).subscribe(() => {
      this.loading = false;
      this.ns.success('Kategorie hinzugefügt', 'Die Kategorie wurde hinzugefügt.');
      this.cs.categoryListChanged.emit();
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
