import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Event } from '../../shared/models/event';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'il-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {


  event: Event;

  form: FormGroup;
  loading = false;

  challenge: string;

  constructor(
    private router: Router,
    private es: EventService,
    private ns: NotificationsService,
    private modal: BsModalRef
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      confirm: new FormControl(false, this.exactValueValidator(true))
    });
  }

  exactValueValidator(value: any) {
    return function(fc: FormControl): { [error: string]: any } {
      return (fc.value === value) ? null : { exactValue: false };
    };
  }

  deleteEvent() {
    this.loading = true;
    this.es.deleteEvent(this.event.id).subscribe(res => {
      this.loading = false;
      this.ns.success('Gelöscht', 'Das Ereignis wurde gelöscht.');

      this.hideModal();
      this.router.navigate(['/event']);
    });

  }

  hideModal() {
    this.modal.hide()
  }
}
