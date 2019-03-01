import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'il-datepicker-modal',
  templateUrl: './datepicker-modal.component.html',
  styleUrls: ['./datepicker-modal.component.css']
})
export class DatepickerModalComponent {
  date: Date;
  updated = new EventEmitter<Date>();

  constructor(private modal: BsModalRef) {}

  setDate(mode: string): void {
    switch (mode) {
      case 'yesterday':
        this.date = new Date(Date.now() - 86400000);
        break;
      case 'lastwed':
        this.date = this.getNextLastWeekday(3, -1);
        break;
      case 'nextwed':
        this.date = this.getNextLastWeekday(3, 1);
        break;
      default:
        this.date = new Date();
    }
  }

  getNextLastWeekday(d: number, direction: number = 1): Date {
    // direction: 1 forward, -1 backwards
    // d: wanted day 0...6
    // m: current day 0...6
    direction = direction > 0 ? 1 : -1;

    const m = new Date().getUTCDay();
    d = d % 7;
    const dayOffset = ((direction * (d - m) + 6) % 7) + 1;
    // (-1 * (6 - 3) + 6) % 7 + 1
    return new Date(Date.now() + 86400000 * direction * dayOffset);
  }

  submitForm() {
    this.updated.emit(this.date);
    this.hideModal();
  }

  hideModal() {
    this.modal.hide();
  }
}
