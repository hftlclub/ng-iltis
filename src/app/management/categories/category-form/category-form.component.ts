import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category, CategoryFactory } from '../../../shared/models/category';
import { HelperService } from '../../../core/helper.service';

@Component({
  selector: 'il-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() edit = false;
  @Input() initialValue = CategoryFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<Category>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HelperService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.initialValue.name, [Validators.required]],
      description: [this.initialValue.description]
    });
  }

  submitForm() {
    const formValue = this.form.value;
    const category = {
      name: formValue.name,
      description: formValue.description
    } as Category;

    this.formSubmitted.emit(category);
  }

  cancel() {
    this.cancelled.emit();
  }
}
