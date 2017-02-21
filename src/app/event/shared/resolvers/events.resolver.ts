import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Event } from '../models/event/event';
import { EventService } from '../event.service';

@Injectable()
export class EventsResolver implements Resolve<Event[]> {

  constructor(private es: EventService) {}

  resolve() {
    return this.es.getAll();
  }

}