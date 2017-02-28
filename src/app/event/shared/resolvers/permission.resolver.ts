import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { EventService } from '../event.service';

@Injectable()
export class PermissionResolver implements Resolve<any> {

  constructor(private es: EventService) {}

  resolve() {
    return this.es.checkPermission();
  }

}
