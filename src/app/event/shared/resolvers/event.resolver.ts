import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Event } from '../../../shared/models/event';
import { EventService } from '../event.service';

@Injectable({ providedIn: 'root' })
export class EventResolver implements Resolve<Event> {
  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let eventId = route.params.eventId;
    if (!eventId) {
      eventId = route.parent.params.eventId;
    }
    return this.es.getEvent(eventId);
  }
}
