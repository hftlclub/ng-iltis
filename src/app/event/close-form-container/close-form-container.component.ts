import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-close-form-container',
  templateUrl: './close-form-container.component.html',
  styleUrls: ['./close-form-container.component.css']
})
export class CloseFormContainerComponent implements OnInit {

  event: Event;
  hasTransfers: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.hasTransfers = !!this.route.snapshot.data['transfers'].length;
  }

  processClosing(data: any) {
    // TODO: Update event with privateCashAfter
    this.closeEvent();
  }


  closeEvent() {
    this.es.closeEvent(this.event.id).subscribe(res => {
      this.es.eventClosed.emit(this.event.id);
      this.ns.success('Ereignis geschlossen', 'Das Ereignis wurde geschlossen.');
      this.navigateToEventPage();
    });
  }

  cancelForm() {
    this.navigateToEventPage();
  }

  navigateToEventPage() {
    this.router.navigate(['../overview'], { relativeTo: this.route });
  }

}
