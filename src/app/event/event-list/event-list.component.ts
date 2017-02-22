import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Event } from '../shared/models/event';

@Component({
  selector: 'il-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }

}
