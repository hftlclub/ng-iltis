import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Transaction } from '../models/transaction';
import { EventService } from '../event.service';

@Injectable()
export class TransactionsResolver implements Resolve<Transaction[]> {

  constructor(private es: EventService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.es.getTransactionsByEvent(route.params['eventId']);
  }

}
