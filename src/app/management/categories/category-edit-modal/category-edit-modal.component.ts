import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NotificationsService } from 'angular2-notifications';

import { Category } from '../../../shared/models/category';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'il-category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent {

  category: Category;
  loading = false;

  constructor(private modal: BsModalRef, private cs: CategoriesService, private ns: NotificationsService) { }

  updateCategory(category: Category) {
    this.loading = true;
    this.cs.update(this.category.id, category).subscribe(() => {
      this.loading = false;
      this.ns.success('Kategorie bearbeitet', 'Die Kategorie wurde bearbeitet.');
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
