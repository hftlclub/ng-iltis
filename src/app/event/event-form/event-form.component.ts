import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Event, EventFactory } from '../shared/models/event';
import { EventType } from '../shared/models/eventtype';

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


  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  ngOnChanges(c: SimpleChanges) {
    if (c['eventTypes']) {
      this.initForm();
    }
  }

  initForm() {
    let initial;
    if (this.initialEvent) {
      initial = {
        eventType: this.initialEvent.eventType.id,
        description: this.initialEvent.description,
        date: this.initialEvent.datetime,
        time: this.initialEvent.datetime
      };

    } else {
      initial = {
        eventType: this.eventTypes[0].id,
        description: '',
        date: new Date(),
        time: this.newDateHHMM()
      };
    }


    this.form = this.fb.group({
      eventType: [initial.eventType, Validators.required],
      description: [initial.description],
      date: [initial.date, Validators.required],
      time: [initial.time, Validators.required]
    });
  }


  submitForm() {
    this.submitted.emit(this.form.value);
  }

  cancelForm() {
    this.cancelled.emit();
  }

  setDate(mode: string): void {
    let newDate;
    switch (mode) {
      case 'yesterday': newDate = new Date(Date.now() - 86400000); break;
      default: newDate = new Date();
    }
    this.form.patchValue({
      date: newDate
    });
  }


  newDateHHMM(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  }


  get isEventMode() {
    return this.uiMode === 'event';
  }

  getString(name: string): string {
    const strings = {
      boxHeadline: {
        event: 'Infos zur Veranstaltung',
        purchase: 'Infos zum Einkauf',
        private: 'Infos zur Spontanentnahme'
      },
      btnLabel: {
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
      }
    };

    return strings[name][this.uiMode];
  }

}
