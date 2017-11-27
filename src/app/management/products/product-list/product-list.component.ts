import { ProductListFilterService } from '../shared/product-list-filter.service';
import { Component, ComponentRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TableColumn, DatatableComponent } from '@swimlane/ngx-datatable';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/product.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'il-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(DatatableComponent) datatable: DatatableComponent;
  @ViewChild('tplImg') tplImg: TemplateRef<any>;
  @ViewChild('tplActive') tplActive: TemplateRef<any>;
  @ViewChild('tplName') tplName: TemplateRef<any>;
  @ViewChild('tplCategory') tplCategory: TemplateRef<any>;
  @ViewChild('tplUnit') tplUnit: TemplateRef<any>;
  @ViewChild('tplActions') tplActions: TemplateRef<any>;

  products$: Observable<Product[]>;

  columns: TableColumn[];

  constructor(public pfs: ProductListFilterService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pfs.refreshProducts();
    this.products$ = this.pfs.productsFiltered$;

    this.columns = [
      { name: '#', cellTemplate: this.tplImg, width: 40, sortable: false },
      { name: 'Name', prop: 'name', cellTemplate: this.tplName },
      { name: 'aktiv', cellTemplate: this.tplActive, width: 40, prop: 'active' },
      { name: 'Kategorie', cellTemplate: this.tplCategory, prop: 'category', comparator: this.categoryComparator },
      { name: 'Beschreibung', prop: 'description' },
      { name: 'Einheit', prop: 'unit.full' },
      { name: 'Aktionen', cellTemplate: this.tplActions, sortable: false, width: 200 },
    ];

    // navigate to detail page on row doubleclick
    this.datatable.activate
      .pipe(filter(e => e.type === 'dblclick'))
      .subscribe(e => this.router.navigate(['..', e.row.id], { relativeTo: this.route }));

    this.datatable.sort
      .pipe(map(e => e.sorts))
      .subscribe(this.pfs.tableSort$);
  }

  categoryComparator(a: any, b: any) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
    if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
  }

  activeComparator(a: any, b: any) {
    if (a && !b) { return -1; }
    if (!a && b) { return 1; }
  }

  getRowClass(row) {
    return {
      'inactive': !row.active
    };
  }

}
