import { NotificationsService } from 'angular2-notifications';
import { EventService } from './../shared/event.service';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subscription } from 'rxjs/Subscription';

import { Event, EventFactory } from '../../shared/models/event';

@Component({
  selector: 'il-cash-modal',
  templateUrl: './cash-modal.component.html',
  styleUrls: ['./cash-modal.component.css']
})
export class CashModalComponent implements OnInit {

  event: Event = EventFactory.empty();

  form: FormGroup;
  loading = false;
  zoneSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private es: EventService,
    private ns: NotificationsService,
    private modal: BsModalRef,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.initForm();
    this.zoneSubscription = this.zone.onStable.subscribe(() => {
      this.initForm();
      this.zoneSubscription.unsubscribe();
    });
  }

  private initForm() {
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


    this.loading = true;
    this.es.updateEvent(this.event.id, newValues as Event).subscribe(event => {
      this.loading = false;
      this.ns.success('Kassenstand', 'Der Kassenstand wurde übernommen.');

      this.event.cashBefore = newValues.cashBefore;
      this.event.cashAfter = newValues.cashAfter;
      this.event.tip = newValues.tip;

      this.es.eventUpdated.emit(this.event);
      this.hideModal();
    });
  }

  get cashAfterIsLess(): boolean {
    return this.form.get('cashAfter').value < this.form.get('cashBefore').value;
  }

  sanitizeFloat(num: any): number {
    if (!num) { num = 0; }
    return parseFloat(num);
  }

  hideModal() {
    this.modal.hide();
  }

}
