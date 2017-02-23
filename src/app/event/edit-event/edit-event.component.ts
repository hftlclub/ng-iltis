import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NotificationsService } from 'angular2-notifications';

import { EventType, EventTypeFactory } from '../shared/models/eventtype';
import { Event, EventFactory } from '../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventTypes: EventType[];
  event: Event;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }


  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.eventTypes = this.route.snapshot.data['eventTypes']
      .filter(e => e.uiMode === this.event.eventType.uiMode);
  }


  updateEvent(formValue) {
    const newEvent = this.event;
    newEvent.datetime = this.mergeDateTime(formValue.date, formValue.time);
    newEvent.description = formValue.description;
    newEvent.eventType = this.eventTypes.find(e => e.id == formValue.eventType);

    this.loading = true;
    this.es.updateEvent(newEvent.id, newEvent).subscribe(event => {
      this.loading = false;
      this.ns.success('Fertig!', 'Das Event wurde bearbeitet.');

      this.es.eventUpdated.emit(newEvent);
      this.router.navigate(['../', event.id], { relativeTo: this.route });
    });
  }

  mergeDateTime(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
  }

  cancelForm() {
    console.log('CANCEL');
  }




}
