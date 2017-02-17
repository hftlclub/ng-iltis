import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'il-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css'],
  exportAs: 'modal'
})
export class ModalTestComponent implements OnInit {
  @ViewChild('modal') modal;

  constructor() { }

  ngOnInit() {
  }

}
