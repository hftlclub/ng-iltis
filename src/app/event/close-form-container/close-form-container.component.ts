import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';
import { EventCloseData } from '../shared/event-close-data';

@Component({
  selector: 'il-close-form-container',
  templateUrl: './close-form-container.component.html',
  styleUrls: ['./close-form-container.component.css']
})
export class CloseFormContainerComponent implements OnInit {

  event: Event;
  hasTransfers: boolean;
  costs: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.hasTransfers = !!this.route.snapshot.data['transfers'].length;

    if (this.event.eventType.uiMode === 'private') {
      this.es.getCostsForEvent(this.event.id).subscribe(res => this.costs = res.costs);
    }
  }

  processClosing(data: EventCloseData) {
    // if cashAfter has changed, change event before closing it. else, just close it
    if (data.cashAfter !== this.event.cashAfter) {
      const newEvent = Object.assign({}, this.event, { cashAfter: data.cashAfter });
      this.es.updateEvent(this.event.id, newEvent)
        .subscribe(() => this.closeEvent());
    } else {
      this.closeEvent();
    }
  }


  closeEvent() {
    this.es.closeEvent(this.event.id).subscribe(res => {
      this.es.eventClosed.emit(this.event.id);
      this.ns.success('Ereignis geschlossen', 'Das Ereignis wurde geschlossen.');
      this.navigateToEventPage();
    },
    err => {
      this.ns.error('Fehler', 'Vorgang abgebrochen');
    });
  }

  cancelForm() {
    this.navigateToEventPage();
  }

  navigateToEventPage() {
    this.router.navigate(['../overview'], { relativeTo: this.route });
  }

}
