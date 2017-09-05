import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SizeType, SizeTypeFactory } from '../../../shared/models/sizetype';

@Component({
  selector: 'il-size-type-form',
  templateUrl: './size-type-form.component.html',
  styleUrls: ['./size-type-form.component.css']
})
export class SizeTypeFormComponent implements OnInit {

  @Input() initialValue = SizeTypeFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<SizeType>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.initialValue.description, [Validators.required]],
      amount: [this.initialValue.amount, [Validators.required]]
    });
  }

  submitForm() {
    const sizeType = this.form.value as SizeType;
    sizeType.amount = parseFloat(this.form.value.amount);
    this.formSubmitted.emit(sizeType);
  }

  cancel() {
    this.cancelled.emit();
  }

}
