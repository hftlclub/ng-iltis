import { Unit, UnitFactory } from '../../../shared/models/unit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'il-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css']
})
export class UnitFormComponent implements OnInit {

  @Input() initialValue = UnitFactory.empty();
  @Input() buttonIcon = 'ok';
  @Input() buttonLabel = 'Übernehmen';
  @Input() loading = false;
  @Output() formSubmitted = new EventEmitter<Unit>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      full: [this.initialValue.full, [Validators.required]],
      short: [this.initialValue.short, [Validators.required]]
    });
  }

  submitForm() {
    const unit = this.form.value as Unit;
    this.formSubmitted.emit(unit);
  }

  cancel() {
    this.cancelled.emit();
  }

}
