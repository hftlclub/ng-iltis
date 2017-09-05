import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'il-product-search-filter',
  templateUrl: './product-search-filter.component.html',
  styleUrls: ['./product-search-filter.component.css']
})
export class ProductSearchFilterComponent implements OnInit {

  control = new FormControl();
  @Output() changed = new EventEmitter<string>();

  ngOnInit() {
    this.control.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(value => this.changed.next(value));
  }

  reset() {
    this.control.setValue('');
  }

}
