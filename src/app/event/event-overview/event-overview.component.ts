import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Event } from '../shared/models/event';
import { EventService } from '../shared/event.service';
import { Calculation } from '../shared/models/calculation';

@Component({
  selector: 'il-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.css']
})
export class EventOverviewComponent implements OnInit, OnDestroy {

  event: Event;
  calc: Calculation;
  calcLoading: boolean;

  eventUpdated$: Subscription;

  constructor(private route: ActivatedRoute, private es: EventService) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    if (!this.event.active) {
      this.calcLoading = true;
      this.es.getCalculationForEvent(this.event.id).subscribe(res => {
        this.calc = res;
        this.calcLoading = false;
      });
    }

    this.eventUpdated$ = this.es.eventUpdated.subscribe(event => this.event = event);

  }

  ngOnDestroy() {
    this.eventUpdated$.unsubscribe()
  }

}
