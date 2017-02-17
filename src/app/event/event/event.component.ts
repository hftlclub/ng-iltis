import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  array = new Array(90);

  constructor() { }

  ngOnInit() {
  }

  newArray(num) {
    return new Array(num);
  }


}
