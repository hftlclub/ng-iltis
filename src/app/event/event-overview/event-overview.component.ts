import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Event } from '../shared/models/event';
import { EventService } from '../shared/event.service';
import { Calculation } from '../shared/models/calculation';

@Component({
  selector: 'il-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.css']
})
export class EventOverviewComponent implements OnInit {

  event: Event;
  calc: Calculation;
  calcLoading: boolean;

  constructor(private route: ActivatedRoute, private es: EventService) { }

  ngOnInit() {
    this.event = this.route.parent.snapshot.data['event'];
    if (!this.event.active) {
      this.calcLoading = true;
      this.es.getCalculationForEvent(this.event.id).subscribe(res => {
        this.calc = res;
        this.calcLoading = false;
      });
    }
  }

}
