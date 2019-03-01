import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EventType } from '../../../shared/models/eventtype';
import { EventService } from '../event.service';

@Injectable({ providedIn: 'root' })
export class EventTypesResolver implements Resolve<EventType[]> {
  constructor(private es: EventService) {}

  resolve() {
    return this.es.getEventTypes();
  }
}
