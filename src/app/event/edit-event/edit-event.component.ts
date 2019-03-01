import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BsModalService } from 'ngx-bootstrap/modal';

import { EventType } from '../../shared/models/eventtype';
import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'il-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventTypes: EventType[];
  event: Event;
  loading = false;
  hasChanges = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventService,
    private ns: NotificationsService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.event = this.route.snapshot.data.event;
    this.eventTypes = this.route.snapshot.data.eventTypes.filter(e => e.uiMode === this.event.eventType.uiMode);
  }

  showDeleteModal() {
    const modal = this.modalService.show(DeleteModalComponent);
    modal.content.event = this.event;
  }

  updateEvent(formValue: any) {
    const newValues = {
      datetime: this.mergeDateTime(formValue.date, formValue.time),
      description: formValue.description,
      eventType: this.eventTypes.find(e => e.id === formValue.eventType.id)
    };

    const newEvent: Event = Object.assign({}, this.event, newValues);

    this.loading = true;
    this.es.updateEvent(newEvent.id, newEvent).subscribe(
      event => {
        this.loading = false;
        this.hasChanges = false;
        this.ns.success('Ereignis', 'Das Ereignis wurde bearbeitet.');

        this.es.eventUpdated.emit(newEvent);
        this.navigateToEventPage();
      },
      err => {
        this.loading = false;
        this.ns.error('Fehler', 'Vorgang abgebrochen');
      }
    );
  }

  mergeDateTime(date: Date, time: Date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
  }

  cancelForm() {
    this.navigateToEventPage();
  }

  navigateToEventPage() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
