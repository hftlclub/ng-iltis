import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'il-datepicker-modal',
  templateUrl: './datepicker-modal.component.html',
  styleUrls: ['./datepicker-modal.component.css']
})
export class DatepickerModalComponent {

  date: Date;// = new Date();
  updated = new EventEmitter<Date>();

  constructor(private modal: BsModalRef) { }

  setDate(mode: string): void {
    switch (mode) {
      case 'yesterday': this.date = new Date(Date.now() - 86400000); break;
      default: this.date = new Date();
    }
  }

  submitForm() {
    this.updated.emit(this.date);
    this.hideModal();
  }

  hideModal() {
    this.modal.hide();
  }



}
