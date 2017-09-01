import { ProductService } from '../../../../core/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Size, SizeFactory } from '../../../../shared/models/size';
import { Unit } from '../../../../shared/models/unit';
import { SizeType } from '../../../../shared/models/sizetype';

@Component({
  selector: 'il-product-size-form',
  templateUrl: './product-size-form.component.html',
  styleUrls: ['./product-size-form.component.css']
})
export class ProductSizeFormComponent implements OnInit {

  @Input() initialValue = SizeFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<Size>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  sizeTypes$: Observable<SizeType[]>;
  unit: Unit;

  constructor(private fb: FormBuilder, private ps: ProductService) { }

  ngOnInit() {
    this.sizeTypes$ = this.ps.getAllSizeTypes();

    this.form = this.fb.group({
      sizeType: [this.initialValue.sizeType.id, [Validators.required]],
      costs: [this.initialValue.costs, [Validators.required]],
      minStock: [this.initialValue.minStock, [Validators.required]]
    });

    // DUMMY
    this.unit = new Unit(1, 'l', 'Liter');
  }

  submitForm() {
    const value = this.form.value;
    const size = {
      sizeType: { id: parseInt(value.sizeType, 0) },
      minStock: value.minStock,
      costs: value.costs
    } as Size;

    this.formSubmitted.emit(size);
  }

  cancel() {
    this.cancelled.emit();
  }

}
