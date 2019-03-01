import { Event } from '../../shared/models/event';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-count-landing',
  templateUrl: './count-landing.component.html',
  styleUrls: ['./count-landing.component.scss']
})
export class CountLandingComponent implements OnInit {
  event: Event;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
  }

  get isActive(): boolean {
    return this.event.active;
  }

  get countAllowed(): boolean {
    return this.event.eventType.countAllowed;
  }
}
