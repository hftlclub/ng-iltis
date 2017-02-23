import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-event-overview-card',
  templateUrl: './event-overview-card.component.html',
  styleUrls: ['./event-overview-card.component.css']
})
export class EventOverviewCardComponent {

  @Input() title: string;
  @Input() icon: string;

}
