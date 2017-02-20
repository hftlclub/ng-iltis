import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Transfer } from './models/transfer/transfer';
import { EventService } from './event.service';

@Injectable()
export class TransfersResolver implements Resolve<Transfer[]> {

  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.es.getTransfersByEvent(route.params['eventId']);
  }

}
