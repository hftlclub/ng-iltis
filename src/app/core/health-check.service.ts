import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { timeout, retry, distinctUntilChanged } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { ConnectionLostModalComponent } from '../connection-lost-modal/connection-lost-modal.component';

@Injectable({ providedIn: 'root' })
export class HealthCheckService {
  times = {
    defaultTimer: 5000,
    criticalTimer: 1000,
    timeout: 3000
  };

  connectionHealthy: BehaviorSubject<any> = new BehaviorSubject(true);
  private timerSubscription: Subscription;
  private modal: BsModalRef;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api,
    private modalService: BsModalService,
    private ns: NotificationsService,
    private ngZone: NgZone
  ) {}

  private setTimer(time: number) {
    this.ngZone.runOutsideAngular(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.timerSubscription = interval(time).subscribe(() => this.handleInterval());
    });
  }

  private handleInterval() {
    return this.http
      .get(`${this.api}/healthcheck`, { responseType: 'text' })
      .pipe(
        timeout(3000),
        retry(2)
      )
      .subscribe(() => this.connectionHealthy.next(true), () => this.connectionHealthy.next(false));
  }

  startHealthCheck() {
    this.setTimer(this.times.defaultTimer);

    this.connectionHealthy.pipe(distinctUntilChanged()).subscribe(healthy => {
      if (!healthy) {
        this.modal = this.modalService.show(ConnectionLostModalComponent, { ignoreBackdropClick: true });
        this.setTimer(this.times.criticalTimer);
      } else if (this.modal) {
        this.modal.hide();
        this.setTimer(this.times.defaultTimer);
        setTimeout(() => this.ns.info('Serververbindung', 'Verbindung wiederhergestellt'), 700);
      }
    });
  }
}
