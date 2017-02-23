import { NotificationsService } from 'angular2-notifications';
import { EventService } from './../shared/event.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Event } from '../shared/models/event/event';

@Component({
  selector: 'il-cash-modal',
  templateUrl: './cash-modal.component.html',
  styleUrls: ['./cash-modal.component.css']
})
export class CashModalComponent implements OnInit {

  @Input() event: Event;
  @Output() hide = new EventEmitter<any>();

  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      cashBefore: [this.event.cashBefore, Validators.required],
      cashAfter: [this.event.cashAfter, Validators.required],
      tip: [this.event.tip, Validators.required],
    });
  }

  submitForm() {
    const val = this.form.value;
    const newValues = {
      cashBefore: this.sanitizeFloat(val.cashBefore),
      cashAfter: this.sanitizeFloat(val.cashAfter),
      tip: this.sanitizeFloat(val.tip)
    };

    const newEvent: Event = Object.assign({}, this.event, newValues);

    this.loading = true;
    this.es.updateEvent(newEvent.id, newEvent).subscribe(event => {
      this.loading = false;
      this.ns.success('Kassenstand', 'Der Kassenstand wurde übernommen.');

      this.es.eventUpdated.emit(newEvent);
      this.hideModal();
    });

  }


  sanitizeFloat(num: any): number {
    if (!num) { num = 0; }
    return parseFloat(num);
  }

  hideModal() {
    this.hide.emit();
  }

}
