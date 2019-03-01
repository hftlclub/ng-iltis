import { HelperService } from '../../core/helper.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { EventCloseData } from '../shared/event-close-data';
import { Event } from '../../shared/models/event/event';

@Component({
  selector: 'il-close-form',
  templateUrl: './close-form.component.html',
  styleUrls: ['./close-form.component.css']
})
export class CloseFormComponent implements OnInit {
  @Input() event: Event;
  @Input() hasTransfers: boolean;
  @Input() costs: number;
  @Output() submitted = new EventEmitter<EventCloseData>();
  @Output() cancelled = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private hs: HelperService) {}

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
    return this.event.eventType.countAllowed && !this.event.countedCounter && !this.form.value.ignoreCounterCount;
  }

  // true when a realEvent has empty cash and empty cash has not been ignored
  get cashInvalid(): boolean {
    return this.event.eventType.realEvent && this.cashEmpty && !this.form.value.ignoreNoCash;
  }

  // true when there's no cash provided for a private removal
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
    const value: EventCloseData = {
      ...this.form.value,
      cashAfter: this.hs.commaToNumber(this.form.value.cashAfter)
    };
    this.submitted.emit(value);
  }

  cancelForm() {
    this.cancelled.emit();
  }
}
