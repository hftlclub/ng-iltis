import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TableColumn } from '@swimlane/ngx-datatable';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/product.service';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild('tplImg') tplImg: TemplateRef<any>;
  @ViewChild('tplActive') tplActive: TemplateRef<any>;
  @ViewChild('tplCategory') tplCategory: TemplateRef<any>;
  @ViewChild('tplUnit') tplUnit: TemplateRef<any>;
  @ViewChild('tplActions') tplActions: TemplateRef<any>;

  products$: Observable<Product[]>;

  columns: TableColumn[];

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.products$ = this.ps.getAll(true, true);

    this.columns = [
      { name: '#', cellTemplate: this.tplImg, width: 40, sortable: false },
      { name: 'Name', prop: 'name' },
      { name: 'aktiv', cellTemplate: this.tplActive, width: 40, sortable: false },
      { name: 'Kategorie', cellTemplate: this.tplCategory, prop: 'category', comparator: this.categoryComparator },
      { name: 'Beschreibung', prop: 'description' },
      { name: 'Einheit', prop: 'unit.full' },
      { name: 'Aktionen', cellTemplate: this.tplActions, sortable: false, width: 200 },
    ];
  }

  categoryComparator(a: any, b: any) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  }


}
