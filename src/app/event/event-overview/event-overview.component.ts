import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { EventService } from '../shared/event.service';
import { Event } from '../../shared/models/event';
import { Calculation } from '../../shared/models/calculation';
import { CashModalComponent } from '../cash-modal/cash-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';


@Component({
  selector: 'il-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.css']
})
export class EventOverviewComponent implements OnInit, OnDestroy {

  event: Event;
  calc: Calculation;
  calcLoading: boolean;

  eventUpdatedSub: Subscription;

  constructor(private route: ActivatedRoute, private es: EventService, private modalService: BsModalService) { }

  ngOnInit() {
    this.event = this.route.snapshot.data['event'];
    this.loadCalculation();

    this.eventUpdatedSub = this.es.eventUpdated.subscribe(event => {
      this.event = event;
      this.loadCalculation();
    });

  }

  showCashModal() {
    const modal = this.modalService.show(CashModalComponent);
    modal.content.event = this.event;
  }

  showDeleteModal() {
    const modal = this.modalService.show(DeleteModalComponent);
    modal.content.event = this.event;
  }

  loadCalculation() {
    if (!this.event.active) {
      this.calcLoading = true;
      this.es.getCalculationForEvent(this.event.id).subscribe(res => {
        this.calc = res;
        this.calcLoading = false;
      });
    }
  }

  get cashEmpty(): boolean {
    return !this.event.cashBefore && !this.event.cashAfter && !this.event.tip;
  }

  get cashAfterIsLess(): boolean {
    return this.event.cashAfter < this.event.cashBefore;
  }

  get isPurchase(): boolean {
    return this.event.eventType.uiMode === 'purchase';
  }

  ngOnDestroy() {
    this.eventUpdatedSub.unsubscribe();
  }

}
