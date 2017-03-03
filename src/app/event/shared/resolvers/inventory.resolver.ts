import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Inventory } from '../../../shared/models/inventory';
import { EventService } from '../event.service';

@Injectable()
export class InventoryResolver implements Resolve<Inventory[]> {

  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let eventId = route.params['eventId'];
    if (!eventId) {
      eventId = route.parent.params['eventId'];
    }
    return this.es.getInventoryForEvent(eventId);
  }

}
