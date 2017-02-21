import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EventType } from '../models/eventtype/eventtype';
import { EventService } from '../event.service';

@Injectable()
export class EventTypesResolver implements Resolve<EventType[]> {

  constructor(private es: EventService) {}

  resolve() {
    return this.es.getEventTypes();
  }
}
