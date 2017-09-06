import { IlValidators } from '../../../../core/il-validators';
import { HelperService } from '../../../../core/helper.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { SizesService } from '../../../shared/sizes.service';
import { Size, SizeFactory } from '../../../../shared/models/size';
import { SizeType, SizeTypeFactory } from '../../../../shared/models/sizetype';
import { Unit } from '../../../../shared/models/unit';

@Component({
  selector: 'il-product-size-form',
  templateUrl: './product-size-form.component.html',
  styleUrls: ['./product-size-form.component.css']
})
export class ProductSizeFormComponent implements OnInit {

  @Input() edit = false;
  @Input() initialValue = new Size(SizeTypeFactory.empty(), 0, 0, true);
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<Size>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  sizeTypes$: Observable<SizeType[]>;
  @Input() unit: Unit;

  constructor(private fb: FormBuilder, private ss: SizesService, private hs: HelperService) { }

  ngOnInit() {
    this.sizeTypes$ = this.ss.getAllSizeTypes();

    this.form = this.fb.group({
      sizeType: [this.initialValue.sizeType.id, [Validators.required, IlValidators.notZero]],
      costs: [this.hs.dotToComma(this.initialValue.costs), [Validators.required]],
      minStock: [this.initialValue.minStock, [Validators.required]],
      active: [this.initialValue.active]
    });

    if (this.edit) {
      this.form.get('sizeType').disable();
    }
  }

  submitForm() {
    const value = this.form.value;
    const size = {
      minStock: parseInt(value.minStock, 0),
      costs: this.hs.commaToNumber(value.costs),
      active: !!value.active
    } as Size;

    if (value.sizeType) {
      size.sizeType = { id: parseInt(value.sizeType, 0) } as SizeType;
    }

    this.formSubmitted.emit(size);
  }

  cancel() {
    this.cancelled.emit();
  }

}
