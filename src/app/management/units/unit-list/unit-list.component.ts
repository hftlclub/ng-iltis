import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UnitsService } from '../shared/units.service';
import { Unit } from '../../../shared/models/unit';


@Component({
  selector: 'il-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {

  units$: Observable<Unit[]>

  constructor(private us: UnitsService) { }

  ngOnInit() {
    this.refreshUnits();
  }

  refreshUnits() {
    this.units$ = this.us.getAll();
  }

}
