import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Event } from '../shared/models/event/event';

@Component({
  selector: 'il-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.css']
})
export class EventOverviewComponent implements OnInit {

  event: Event;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.route.parent.snapshot.data['event'];
  }

}
