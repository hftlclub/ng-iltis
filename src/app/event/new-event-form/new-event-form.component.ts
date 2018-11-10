import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

import { EventType, EventTypeFactory } from '../../shared/models/eventtype';
import { Event, EventFactory } from '../../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-new-event-form',
  templateUrl: './new-event-form.component.html',
  styleUrls: ['./new-event-form.component.css']
})
export class NewEventFormComponent implements OnInit, OnDestroy {

  eventTypesAll: EventType[];
  eventTypes: EventType[];
  uiMode: string;
  createCountAllowed: boolean;
  loading = false;
  hasChanges = false;

  paramsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }


  ngOnInit() {
    this.eventTypesAll = this.route.snapshot.data['eventTypes'];
    this.createCountAllowed = this.route.snapshot.data['permission'].createEventCountAllowed;

    this.eventTypes = this.updateUiMode(this.route.snapshot.params['uiMode']);
    this.paramsSub = this.route.params.subscribe(p => this.eventTypes = this.updateUiMode(p['uiMode']));
  }


  updateUiMode(uiMode: string) {
    this.uiMode = uiMode;
    this.hasChanges = false;

    let eventTypes = this.eventTypesAll.filter(e => e.uiMode === this.uiMode);

    if (!this.createCountAllowed) {
      eventTypes = eventTypes.filter(e => !e.countAllowed);
    }

    return eventTypes;
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }


  createEvent(formValue) {
    const newEvent: Event = EventFactory.fromObj({
      eventType: formValue.eventType,
      description: formValue.description,
      datetime: this.mergeDateTime(formValue.date, formValue.time),
      active: true
    });


    this.loading = true;
    this.es.createEvent(newEvent).subscribe(event => {
      this.loading = false;
      this.hasChanges = false;
      this.ns.success('Ereignis', 'Das Ereignis wurde angelegt.');

      let redirectUri;
      switch (this.uiMode) {
        case 'private':
          redirectUri = ['../../', event.id, 'products']; break;
        default:
          redirectUri = ['../../', event.id]; break;
      }
      this.router.navigate(redirectUri, { relativeTo: this.route });
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Vorgang abgebrochen');
    });
  }


  mergeDateTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
  }





}
