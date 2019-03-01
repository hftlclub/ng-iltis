import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'il-timepicker-modal',
  templateUrl: './timepicker-modal.component.html',
  styleUrls: ['./timepicker-modal.component.css']
})
export class TimepickerModalComponent {
  date: Date;
  updated = new EventEmitter<Date>();

  constructor(private modal: BsModalRef) {}

  setTime(hours: number, min: number): void {
    const newDate = new Date();
    if (hours !== -1) {
      newDate.setHours(hours);
    }
    if (min !== -1) {
      newDate.setMinutes(min);
    }

    this.date = newDate;
  }

  submitForm() {
    this.updated.emit(this.date);
    this.hideModal();
  }

  hideModal() {
    this.modal.hide();
  }
}
