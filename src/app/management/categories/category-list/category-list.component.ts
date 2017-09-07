import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BsModalService } from 'ngx-bootstrap';

import { Category } from '../../../shared/models/category';
import { CategoriesService } from '../../shared/categories.service';
import { CategoryCreateModalComponent } from '../category-create-modal/category-create-modal.component';
import { CategoryEditModalComponent } from '../category-edit-modal/category-edit-modal.component';
import { CategoryDeleteModalComponent } from '../category-delete-modal/category-delete-modal.component';

@Component({
  selector: 'il-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private cs: CategoriesService, private modalService: BsModalService) { }

  ngOnInit() {
    this.refreshCategories();
    this.cs.categoryListChanged.subscribe(() => this.refreshCategories())
  }

  refreshCategories() {
    this.categories$ = this.cs.getAll()
      .map(cc => cc.sort((a, b) => b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1));
  }

  showDeleteModal(c: Category) {
    const modal = this.modalService.show(CategoryDeleteModalComponent);
    modal.content.category = c;
  }

  showEditModal(c: Category) {
    const modal = this.modalService.show(CategoryEditModalComponent);
    modal.content.category = c;
  }

  showCreateModal() {
    this.modalService.show(CategoryCreateModalComponent);
  }

}
