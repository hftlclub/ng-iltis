import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../core/global.service';
import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';
import { switchMap } from 'rxjs/operators';

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
        transform: 'translateX(220px)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
    trigger('btnInOut', [
      state('in', style({
        right: '250px',
      })),
      state('out', style({
        right: '30px',
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
    trigger('containerInOut', [
      state('in', style({
        marginRight: '250px !important'
      })),
      state('out', style({
        marginRight: '30px !important '
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
  ]
})
export class EventComponent implements OnInit, OnDestroy {

  sidebarVisible = true;

  event: Event;
  eventUpdatedSub: Subscription;
  eventClosedSub: Subscription;
  mobileModeSub: Subscription;

  tabs: Tab[] = [];

  constructor(
    private route: ActivatedRoute,
    private es: EventService,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];

    this.eventUpdatedSub = this.es.eventUpdated.subscribe(event => this.event = event);

    this.eventClosedSub = this.es.eventClosed.pipe(
      switchMap(eventId => this.es.getEvent(eventId))
    )
    .subscribe(event => this.event = event);

    this.mobileModeSub = this.gs.mobileMode.subscribe(mm => this.sidebarVisible = !mm);


    this.tabs = this.tabsData().filter(t => t.show);
  }

  ngOnDestroy() {
    this.eventUpdatedSub.unsubscribe();
    this.eventClosedSub.unsubscribe();
    this.mobileModeSub.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  get sidebarState(): string {
    return (this.sidebarVisible) ? 'in' : 'out';
  }

  tabsData(): Tab[] {
    return [
      {
        label: 'Übersicht',
        link: './overview',
        icon: 'fa-newspaper-o',
        show: true
      },
      {
        label: 'Neue Buchung',
        link: './products',
        icon: 'fa-plus',
        show: this.event.active
      },
      {
        label: 'Zählung',
        link: './count',
        icon: 'fa-list-ol',
        show: this.event.active
      },
      {
        label: 'Lagerbestand',
        link: './inventory',
        icon: 'stock',
        show: !this.event.active
      },
      {
        label: 'Notizen',
        link: './notes',
        icon: 'fa-file-text-o',
        show: true
      },
      {
        label: 'Infos bearbeiten',
        link: './edit',
        icon: 'edit',
        show: true
      },
      {
        label: 'Ereignis schließen',
        link: './close',
        icon: 'fa-calendar-check-o',
        show: this.event.active
      },
    ];
  }

}


interface Tab {
  link: string | string[];
  label: string;
  icon: string;
  show: boolean;
}
