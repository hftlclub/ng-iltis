import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { ProductListFilterService } from '../shared/product-list-filter.service';

@Component({
  selector: 'il-product-search-filter',
  templateUrl: './product-search-filter.component.html',
  styleUrls: ['./product-search-filter.component.css']
})
export class ProductSearchFilterComponent implements OnInit {

  control: FormControl;

  constructor(private pfs: ProductListFilterService) { }

  ngOnInit() {
    this.control = new FormControl();
    this.pfs.searchFilter$.subscribe(v => this.control.setValue(v));

    this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(this.pfs.searchFilter$);
  }

  reset() {
    this.control.setValue('');
  }

}
