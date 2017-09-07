import { IlValidators } from '../../../core/il-validators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrateType, CrateTypeFactory } from '../../../shared/models/cratetype';
import { SizeType } from '../../../shared/models/sizetype';
import { HelperService } from '../../../core/helper.service';

@Component({
  selector: 'il-crate-type-form',
  templateUrl: './crate-type-form.component.html',
  styleUrls: ['./crate-type-form.component.css']
})
export class CrateTypeFormComponent implements OnInit {

  @Input() edit = false;
  @Input() sizeTypes: SizeType[];
  @Input() initialValue = CrateTypeFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<CrateType>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HelperService) { }

  ngOnInit() {
    this.form = this.fb.group({
      sizeType: [this.initialValue.sizeType.id, [Validators.required, IlValidators.notZero]],
      slots: [this.initialValue.slots, [Validators.required]],
      description: [this.initialValue.description, [Validators.required]],
    });
  }

  submitForm() {
    const formValue = this.form.value;
    const crateType = {
      sizeType: { id: formValue.sizeType },
      slots: formValue.slots,
      description: formValue.description
    } as CrateType;

    this.formSubmitted.emit(crateType);
  }

  cancel() {
    this.cancelled.emit();
  }

}
