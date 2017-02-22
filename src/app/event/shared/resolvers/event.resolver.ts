import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Event } from '../models/event';
import { EventService } from '../event.service';

@Injectable()
export class EventResolver implements Resolve<Event> {

  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.es.getEvent(route.params['eventId']);
  }

}
