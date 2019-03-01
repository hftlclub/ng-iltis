import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'il-modal-button-footer',
  templateUrl: './modal-button-footer.component.html',
  styleUrls: ['./modal-button-footer.component.css']
})
export class ModalButtonFooterComponent implements OnInit {
  @Input() breakpoint = 'sm';

  constructor() {}

  ngOnInit() {}
}
