import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/distinctUntilChanged';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationsService } from 'angular2-notifications';

import { ConnectionLostModalComponent } from '../connection-lost-modal/connection-lost-modal.component';

@Injectable()
export class HealthCheckService {

  connectionHealthy: BehaviorSubject<any> = new BehaviorSubject(true);
  private timerSubscription: Subscription;
  private modal: BsModalRef;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private api,
    private modalService: BsModalService,
    private ns: NotificationsService) { }

  private setTimer(time: number) {
    if (this.timerSubscription) { this.timerSubscription.unsubscribe() };
    this.timerSubscription = Observable.interval(time).subscribe(() => this.handleInterval());
  }

  private setCriticalTimer() {
    this.setTimer(1000);
  }

  private setDefaultTimer() {
    this.setTimer(5000);
  }

  private handleInterval() {
    return this.http.get(`${this.api}/info`).subscribe(
      () => this.connectionHealthy.next(true),
      () => this.connectionHealthy.next(false)
    )
  }

  startHealthCheck() {
    this.setDefaultTimer();

    this.connectionHealthy
      .distinctUntilChanged()
      .subscribe(healthy => {
        if (!healthy) {
          this.modal = this.modalService.show(ConnectionLostModalComponent, { ignoreBackdropClick: true });
          this.setCriticalTimer();
        } else if (this.modal) {
          this.modal.hide();
          this.setDefaultTimer();

          setTimeout(() => this.ns.info('Serververbindung', 'Verbindung wiederhergestellt'), 700);
        }
      });
  }

}
