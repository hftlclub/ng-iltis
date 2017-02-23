import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '../shared/models/event';
import { EventService } from './../shared/event.service';

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;

  constructor(
    private route: ActivatedRoute,
    private es: EventService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.es.eventUpdated.subscribe(event => this.event = event);
  }
}
