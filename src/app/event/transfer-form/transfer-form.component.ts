import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  foo= 5;

  constructor() { }

  ngOnInit() {
  }

  newArray(num) {
    return new Array(num);
  }

}
