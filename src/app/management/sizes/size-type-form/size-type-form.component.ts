import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SizeType, SizeTypeFactory } from '../../../shared/models/sizetype';
import { HelperService } from '../../../core/helper.service';

@Component({
  selector: 'il-size-type-form',
  templateUrl: './size-type-form.component.html',
  styleUrls: ['./size-type-form.component.css']
})
export class SizeTypeFormComponent implements OnInit {

  @Input() edit = false;
  @Input() initialValue = SizeTypeFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<SizeType>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HelperService) { }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.initialValue.description, [Validators.required]],
      amount: [this.hs.dotToComma(this.initialValue.amount), [Validators.required]]
    });

    if (this.edit) {
      this.form.get('amount').disable();
    }
  }

  submitForm() {
    const formValue = this.form.value;
    const sizeType = {
      description: formValue.description,
      amount: formValue.amount ? this.hs.commaToNumber(this.form.value.amount) : null
    } as SizeType;

    this.formSubmitted.emit(sizeType);
  }

  cancel() {
    this.cancelled.emit();
  }

}
