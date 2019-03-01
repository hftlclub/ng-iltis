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
  loading = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private modalService: BsModalService) {}

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
    if (c.eventTypes && this.form) {
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
        eventType: this.eventTypes[0] || '',
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
    const modal = this.modalService.show(DatepickerModalComponent, { class: 'modal-lg' });
    modal.content.date = this.form.get('date').value;
    modal.content.updated.subscribe(date => this.form.patchValue({ date }));
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
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      Math.ceil(date.getMinutes() / 15) * 15
    );
  }

  get isEventMode(): boolean {
    return this.uiMode === 'event';
  }

  get isStocktakeMode(): boolean {
    return this.uiMode === 'stocktake';
  }

  getString(name: string): string {
    const strings = {
      boxHeadline: {
        event: 'Veranstaltung anlegen',
        purchase: 'Einkauf erfassen',
        private: 'Spontanentnahme erfassen',
        stocktake: 'Inventur durchführen'
      },
      buttonLabel: {
        event: 'Veranstaltung anlegen',
        purchase: 'Einkauf anlegen',
        private: 'Spontanentnahme starten',
        stocktake: 'Inventur starten'
      },
      descriptionPlaceholder: {
        event: 'Veranstaltungsinfo, Gastgeber, ...',
        purchase: 'Zusätzliche Infos zum Einkauf',
        private: 'Zweck, ...',
        stocktake: 'Zusätzliche Infos zur Inventur'
      },
      headline: {
        event: 'Neue Veranstaltung',
        purchase: 'Neuer Einkauf',
        private: 'Neue Spontanentnahme',
        stocktake: 'Neue Inventur'
      },
      eventType: {
        event: 'Veranstaltungstyp',
        purchase: 'Ereignistyp',
        private: 'Ereignistyp',
        stocktake: 'Ereignistyp'
      },
      icon: {
        event: 'evEvent',
        purchase: 'evPurchase',
        private: 'evPrivate',
        stocktake: 'evStocktake'
      }
    };

    return strings[name][this.uiMode];
  }
}
