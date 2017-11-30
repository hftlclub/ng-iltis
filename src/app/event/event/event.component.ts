import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../core/global.service';
import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';
import { switchMap, filter } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      state('out', style({
        transform: 'translateX(100%)'
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
    trigger('btnInOut', [
      state('in', style({
        right: '250px',
      })),
      state('out', style({
        right: '0',
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
    trigger('containerInOut', [
      state('in', style({
        marginRight: '250px'
      })),
      state('out', style({
        marginRight: '0'
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

    this.tabs = this.tabsData().filter(t => !t.hide);

    Observable.fromEvent(window, 'keypress').pipe(
      filter((e: any) => e.keyCode === 115 && !(e.target instanceof HTMLInputElement)) // s
    ).subscribe(e => this.toggleSidebar());
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
        icon: 'fa-newspaper-o'
      },
      {
        label: 'Neue Buchung',
        link: './products',
        icon: 'plus',
        hide: !this.event.active
      },
      {
        label: 'Zählung',
        link: './count',
        icon: 'fa-list-ol',
        hide: !this.event.active,
        disabled: !this.event.eventType.countAllowed
      },
      {
        label: 'Lagerbestand',
        link: './inventory',
        icon: 'stock',
        hide: this.event.active
      },
      {
        label: 'Notizen',
        link: './notes',
        icon: 'fa-file-text-o',
      },
      {
        label: 'Infos bearbeiten',
        link: './edit',
        icon: 'edit',
      },
      {
        label: 'Ereignis schließen',
        link: './close',
        icon: 'evClose',
        hide: !this.event.active
      },
    ];
  }

}


interface Tab {
  link: string | string[];
  label: string;
  icon: string;
  hide?: boolean;
  disabled?: boolean;
}
