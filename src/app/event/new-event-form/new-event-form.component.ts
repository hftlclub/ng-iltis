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
  loading = false;
  hasChanges = false;

  params$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }


  ngOnInit() {
    this.eventTypesAll = this.route.snapshot.data['eventTypes'];
    this.params$ = this.route.params.subscribe(p => {
      this.uiMode = p['uiMode'];
      this.hasChanges = false;

      this.eventTypes = this.eventTypesAll.filter(e => e.uiMode === this.uiMode);
      if (!this.eventTypes.length) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.params$.unsubscribe();
  }


  createEvent(formValue) {
    const newEvent: Event = EventFactory.fromObj({
      eventType: { id: formValue.eventType },
      description: formValue.description,
      datetime: this.mergeDateTime(formValue.date, formValue.time),
      active: true
    });


    this.loading = true;
    this.es.createEvent(newEvent).subscribe(event => {
      this.loading = false;
      this.hasChanges = false;
      this.ns.success('Eregnis', 'Das Ereignis wurde angelegt.');

      this.router.navigate(['../../', event.id], { relativeTo: this.route });
    });
  }


  mergeDateTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
  }





}
