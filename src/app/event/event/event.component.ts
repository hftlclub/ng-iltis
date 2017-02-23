import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '../shared/models/event';
import { EventService } from './../shared/event.service';

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  event: Event;
  eventUpdated$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private es: EventService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.eventUpdated$ = this.es.eventUpdated.subscribe(event => this.event = event);
  }

  ngOnDestroy() {
    this.eventUpdated$.unsubscribe();
  }
}
