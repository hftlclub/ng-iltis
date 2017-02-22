import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event } from '../shared/models/event';

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
  }
}
