import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Event } from '../../shared/models/event/event';

@Component({
  selector: 'il-close-form',
  templateUrl: './close-form.component.html',
  styleUrls: ['./close-form.component.css']
})
export class CloseFormComponent implements OnInit {

  @Input() event: Event;
  @Input() hasTransfers: boolean;
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;
  deliveryCosts = 0; // TODO: fill with actual value

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      ignoreCounterCount: [false],
      cashAfter: [this.event.cashAfter],
      ignoreNoCash: [false],
      confirmClose: [false]
    });
  }

  get isClosable(): boolean {
    return this.hasTransfers;
  }

  // true when a countAllowed event has not counted the counter and empty values have not been ignored
  get counterCountInvalid(): boolean {
    return this.event.eventType.countAllowed && !(this.event.countedStorage || this.form.value.ignoreCounterCount);
  }

  // true when a realEvent has empty cash and empty cash has not been ignored
  get cashInvalid(): boolean {
    return this.event.eventType.realEvent && this.cashEmpty && !this.form.value.ignoreNoCash;
  }

  // true when there's no cash proided for a private removal
  get privateNoCash(): boolean {
    return this.event.eventType.uiMode === 'private' && !this.form.value.cashAfter;
  }

  // true when no cash provided
  get cashEmpty(): boolean {
    return !this.event.cashBefore && !this.event.cashAfter;
  }

  get isPrivateRemoval(): boolean {
    return this.event.eventType.uiMode === 'private';
  }

  submitForm() {
    this.submitted.emit(this.form.value);
  }

  cancelForm() {
    this.cancelled.emit();
  }

}
