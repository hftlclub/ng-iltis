import { ProductListFilterService } from '../shared/product-list-filter.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-product-group-filter',
  templateUrl: './product-group-filter.component.html',
  styleUrls: ['./product-group-filter.component.css']
})
export class ProductGroupFilterComponent implements OnInit {

  form: FormGroup;

  constructor(private pfs: ProductListFilterService) { }

  ngOnInit() {
    this.form = new FormGroup({
      active: new FormControl(),
      inactive: new FormControl()
    });

    this.pfs.groupFilter$.subscribe(v => this.form.setValue(v));

    this.form.valueChanges
      .debounceTime(100)
      .subscribe(v => this.pfs.groupFilter$.next(v));
  }

}
