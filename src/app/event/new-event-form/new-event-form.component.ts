import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { EventType, EventTypeFactory } from '../shared/models/eventtype';
import { Event, EventFactory } from '../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit, OnDestroy {

  eventTypes: EventType[];
  uiMode: string;
  form: FormGroup;
  loading = false;

  params$: Subscription;


  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private es: EventService) { }


  ngOnInit() {
    this.params$ = this.route.params.subscribe(p => {
      this.uiMode = p['uiMode'];
      this.es.getEventTypes().subscribe(et => {
        this.eventTypes = et;
        this.eventTypes = this.eventTypes.filter(e => e.uiMode === this.uiMode);
        this.initForm();

        if (!this.eventTypes.length) {
          this.router.navigate(['/']);
        }
      });
    });

    // init form with one empty event type (as long as we're waiting for data)
    this.eventTypes = [EventTypeFactory.empty()];
    this.initForm();
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }


  initForm() {
    this.form = this.fb.group({
      eventType: [this.eventTypes[0].id, Validators.required],
      description: [],
      date: [new Date(), Validators.required],
      time: [this.newDateHHMM(), Validators.required]
    });
  }

  submitForm() {
    const formValue = this.form.value;
    const event: Event = EventFactory.fromObj({
      eventType: { id: formValue.eventType },
      description: formValue.description,
      datetime: this.mergeDateTime(formValue.date, formValue.time),
      active: true
    });

    this.loading = true;
    this.es.createEvent(event).subscribe(res => {
      this.loading = false;
    });
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

  mergeDateTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
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
      }
    };

    return strings[name][this.uiMode];
  }

}
