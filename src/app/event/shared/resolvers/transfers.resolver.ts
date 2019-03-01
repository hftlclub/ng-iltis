import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Transfer } from '../../../shared/models/transfer';
import { EventService } from '../event.service';

@Injectable({ providedIn: 'root' })
export class TransfersResolver implements Resolve<Transfer[]> {
  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    let eventId = route.params.eventId;
    if (!eventId) {
      eventId = route.parent.params.eventId;
    }
    return this.es.getTransfersByEvent(eventId);
  }
}
