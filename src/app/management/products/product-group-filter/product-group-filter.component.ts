import { ProductListFilterService } from '../shared/product-list-filter.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-product-group-filter',
  templateUrl: './product-group-filter.component.html',
  styleUrls: ['./product-group-filter.component.scss']
})
export class ProductGroupFilterComponent implements OnInit {
  form: FormGroup;
  groups = [
    {
      name: 'active',
      label: 'aktive'
    },
    {
      name: 'inactive',
      label: 'inaktive'
    }
  ];

  constructor(private pfs: ProductListFilterService) {}

  ngOnInit() {
    this.form = new FormGroup({
      active: new FormControl(),
      inactive: new FormControl()
    });

    this.pfs.groupFilter$.subscribe(v => this.form.setValue(v));
  }

  valueChanged() {
    this.pfs.groupFilter$.next(this.form.value);
  }

  toggleCheckbox(name: string) {
    const box = this.form.get(name);
    box.setValue(!box.value);
    this.valueChanged();
  }
}
