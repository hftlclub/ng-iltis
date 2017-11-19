import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EventService } from '../shared/event.service';
import { Inventory } from '../../shared/models/inventory';

@Component({
  selector: 'il-event-inventory',
  templateUrl: './event-inventory.component.html',
  styleUrls: ['./event-inventory.component.css']
})
export class EventInventoryComponent implements OnInit {

  inventory$: Observable<Inventory[]>;

  constructor(private es: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    const eventId = this.route.parent.snapshot.params.eventId;
    this.inventory$ = this.es.getInventory(eventId);
  }

}
