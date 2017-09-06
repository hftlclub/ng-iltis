import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

import { Event, EventFactory } from '../../shared/models/event';
import { EventType } from '../../shared/models/eventtype';
import { DatepickerModalComponent } from '../datepicker-modal/datepicker-modal.component';
import { TimepickerModalComponent } from '../timepicker-modal/timepicker-modal.component';

@Component({
  selector: 'il-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit, OnChanges {

  @Input() uiMode: string;
  @Input() edit = false;
  @Input() initialEvent: Event;
  @Input() eventTypes: EventType[];
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    const initial = this.getInitialFormValues();

    this.form = this.fb.group({
      eventType: [initial.eventType, Validators.required],
      description: [initial.description],
      date: [initial.date, Validators.required],
      time: [initial.time, Validators.required]
    });

    this.form.valueChanges.subscribe(v => this.valueChanged.emit(v));
  }


  ngOnChanges(c: SimpleChanges) {
    if (c['eventTypes'] && this.form) {
      this.rebuildForm();
    }
  }

  getInitialFormValues() {
    let initial;
    if (this.initialEvent) {
      initial = {
        eventType: this.initialEvent.eventType,
        description: this.initialEvent.description,
        date: this.initialEvent.datetime,
        time: this.initialEvent.datetime
      };

    } else {
      initial = {
        eventType: this.eventTypes[0],
        description: '',
        date: new Date(),
        time: this.newDateHHMM15()
      };
    }

    return initial;
  }


  rebuildForm() {
    this.form.setValue(this.getInitialFormValues());
  }

  compareEventTypes(e1: EventType, e2: EventType) {
    return e1.id === e2.id;
  }


  submitForm() {
    this.submitted.emit(this.form.value);
  }

  cancelForm() {
    this.cancelled.emit();
  }

  showDatepickerModal() {
    const modal = this.modalService.show(DatepickerModalComponent);
    modal.content.date = this.form.get('date').value;
    modal.content.updated.subscribe(date => this.form.patchValue({ date: date }));
  }

  showTimepickerModal() {
    const modal = this.modalService.show(TimepickerModalComponent, { class: 'modal-sm' });
    modal.content.date = this.form.get('time').value;
    modal.content.updated.subscribe(date => this.form.patchValue({ time: date }));
  }

  // returns new Date object with nothing "smaller" than HH and MM (thus, no milliseconds)
  // and minutes ceiled to 00/15/30/45
  newDateHHMM15(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), Math.ceil(date.getMinutes() / 15) * 15);
  }


  get isEventMode(): boolean {
    return this.uiMode === 'event';
  }

  getString(name: string): string {
    const strings = {
      boxHeadline: {
        event: 'Infos zur Veranstaltung',
        purchase: 'Infos zum Einkauf',
        private: 'Infos zur Spontanentnahme'
      },
      buttonLabel: {
        event: 'Veranstaltung anlegen',
        purchase: 'Einkauf anlegen',
        private: 'Spontanentnahme starten'
      },
      descriptionPlaceholder: {
        event: 'Veranstaltungsinfo, Gastgeber, ...',
        purchase: 'Zusätzliche Infos zum Einkauf',
        private: 'Zweck, ...'
      },
      headline: {
        event: 'Neue Veranstaltung',
        purchase: 'Neuer Einkauf',
        private: 'Neue Spontanentnahme'
      },
      eventType: {
        event: 'Veranstaltungstyp',
        purchase: 'Ereignistyp',
        private: 'Ereignistyp'
      }
    };

    return strings[name][this.uiMode];
  }

}
