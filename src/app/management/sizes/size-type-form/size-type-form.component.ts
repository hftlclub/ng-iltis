import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SizeType, SizeTypeFactory } from '../../../shared/models/sizetype';
import { Unit } from '../../../shared/models/unit';
import { HelperService } from '../../../core/helper.service';
import { IlValidators } from '../../../core/il-validators';

@Component({
  selector: 'il-size-type-form',
  templateUrl: './size-type-form.component.html',
  styleUrls: ['./size-type-form.component.css']
})
export class SizeTypeFormComponent implements OnInit, OnChanges {

  @Input() edit = false;
  @Input() initialValue = SizeTypeFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<SizeType>();
  @Output() cancelled = new EventEmitter<any>();

  @Input() units: Unit[];

  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HelperService) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.initialValue.description, [Validators.required]],
      unit: [this.initialValue.unit.id, [Validators.required, IlValidators.notZero]],
      amount: [this.hs.dotToComma(this.initialValue.amount), [Validators.required, IlValidators.min(0.01), Validators.max(500)]]
    });

    if (this.edit) {
      this.form.get('unit').disable();
      this.form.get('amount').disable();
    }
  }

  ngOnChanges(c: SimpleChanges) {
    if (c.units && c.units.currentValue) {
      if (!this.edit) {
        this.form.get('unit').setValue(this.units[0].id);
      }
    }
  }

  submitForm() {
    const formValue = this.form.value;
    const sizeType = {
      description: formValue.description,
      unit: { id: formValue.unit || this.initialValue.unit.id },
      amount: formValue.amount ? this.hs.commaToNumber(this.form.value.amount) : this.initialValue.amount
    } as SizeType;

    this.formSubmitted.emit(sizeType);
  }

  cancel() {
    this.cancelled.emit();
  }

  getUnitById(id: number) {
    if (!this.units) { return; }
    return this.units.find(u => u.id == id);
  }

}
