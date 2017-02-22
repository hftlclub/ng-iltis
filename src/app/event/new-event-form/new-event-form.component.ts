import { EventTypeFactory } from './../shared/models/eventtype/eventtype-factory';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { EventType } from '../shared/models/eventtype';
import { Event, EventFactory } from '../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit {

  eventTypes: EventType[];
  uiMode: string;
  form: FormGroup;



  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private es: EventService) { }


  ngOnInit() {
    this.route.params.subscribe(p => {
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

    this.eventTypes = [EventTypeFactory.empty()];
    this.initForm();

  }


  initForm() {
    const preSelectedEventType = (this.eventTypes.length) ? this.eventTypes[0].id : '';

    this.form = this.fb.group({
      eventType: [preSelectedEventType],
      description: [],
      date: [new Date()],
      time: [this.newDateHHMM()]
    });
  }

  submitForm() {
    const event: Event = EventFactory.fromObj(this.form.value);
    console.log(event);


  }


  newDateHHMM() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  }

  get isEventMode() {
    return this.uiMode === 'event';
  }

  getString(name: string) {
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
