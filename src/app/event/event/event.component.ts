import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('btnInOut', [
      state('in', style({
        right: '250px',
      })),
      state('out', style({
        right: '0',
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('containerInOut', [
      state('in', style({
        marginRight: '250px'
      })),
      state('out', style({
        marginRight: '0'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class EventComponent implements OnInit, OnDestroy {

  sidebarVisible = true;

  event: Event;
  eventUpdated$: Subscription;
  eventClosed$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private es: EventService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];

    this.eventUpdated$ = this.es.eventUpdated.subscribe(event => this.event = event);

    this.eventClosed$ = this.es.eventClosed
      .switchMap(eventId => this.es.getEvent(eventId))
      .subscribe(event => this.event = event);
  }

  ngOnDestroy() {
    this.eventUpdated$.unsubscribe();
    this.eventClosed$.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  get sidebarState(): string {
    return (this.sidebarVisible) ? 'in' : 'out';
  }

}
