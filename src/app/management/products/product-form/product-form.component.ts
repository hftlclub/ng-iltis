import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from '../../../shared/models/category';
import { Product } from '../../../shared/models/product';
import { Unit } from '../../../shared/models/unit';

@Component({
  selector: 'il-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() loading = false;
  @Input() btnLabel = 'Speichern';

  @Input() initialProduct: Product;
  @Input() categories: Category[];
  @Input() units: Unit[];

  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const initial = this.getInitialFormValues();

    this.form = this.fb.group({
      name: [initial.name, Validators.required],
      description: [initial.description],
      category: [initial.category, Validators.required],
      unit: [initial.unit, Validators.required]
    });

    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
  }


  getInitialFormValues() {
    let initial;
    if (this.initialProduct) {
      initial = {
        name: this.initialProduct.name,
        description: this.initialProduct.description,
        category: this.initialProduct.category.id,
        unit: this.initialProduct.unit.id
      };

    } else {
      initial = {
        name: '',
        description: '',
        category: 0,
        unit: 0
      };
    }

    return initial;
  }

  submitForm() {
    const formValue = this.form.value;
    const product = {
      name: formValue.name,
      description: formValue.description,
      category: { id: parseInt(formValue.category, 0) },
      unit: { id: parseInt(formValue.unit, 0) }
    }
    this.submitted.emit(product);
  }

  cancelForm() {
    this.cancelled.emit();
  }

}
