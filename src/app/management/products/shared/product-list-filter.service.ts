import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/do';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../core/product.service';
import { HelperService } from '../../../core/helper.service';
import { Filters } from './filters';
import { GroupFilters } from './group-filters';
import { TableSort } from './tablesort';

@Injectable()
export class ProductListFilterService {

  products$ = new BehaviorSubject<Product[]>([]);
  productsFiltered$ = new BehaviorSubject<Product[]>([]);

  tableSort$: BehaviorSubject<TableSort[]>;

  searchFilter$: BehaviorSubject<string>;
  categoriesFilter$: BehaviorSubject<number[]>;
  groupFilter$: BehaviorSubject<GroupFilters>;

  filters$: BehaviorSubject<Filters>;

  defaultFilters: Filters = {
    categories: null,
    search: '',
    groupFilters: { active: true, inactive: true },
  }

  defaultTableSort: TableSort[] = [{dir: 'asc', prop: 'name'}];

  constructor(private ps: ProductService, private hs: HelperService) {
    this.filters$ = new BehaviorSubject(this.defaultFilters);
    this.searchFilter$ = new BehaviorSubject(this.defaultFilters.search);
    this.categoriesFilter$ = new BehaviorSubject(this.defaultFilters.categories);
    this.groupFilter$ = new BehaviorSubject(this.defaultFilters.groupFilters)

    this.tableSort$ = new BehaviorSubject(this.defaultTableSort);

    Observable.combineLatest(
      this.searchFilter$,
      this.groupFilter$,
      this.categoriesFilter$,
      (search, group, categories) => ({
        search: search,
        groupFilters: group,
        categories: categories
      }))
      .subscribe(this.filters$);

    this.filters$.subscribe(f => {
      this.productsFiltered$.next(this.filterProducts(this.products$.getValue(), f));
    });

    this.products$.subscribe(p => {
      this.productsFiltered$.next(this.filterProducts(p, this.filters$.getValue()));
    });
  }


  refreshProducts() {
    this.ps.getAll(true, true).subscribe(this.products$);
  }

  resetFilters() {
    this.searchFilter$.next(this.defaultFilters.search);
    this.categoriesFilter$.next(this.defaultFilters.categories);
    this.groupFilter$.next(this.defaultFilters.groupFilters);
  }

  resetTableSort() {
    this.tableSort$.next(this.defaultTableSort);
  }


  private filterProducts(products: Product[], filters: Filters): Product[] {
    let filtered: Product[];
    filtered = products.filter(p => (filters.groupFilters.active && p.active) || (filters.groupFilters.inactive && !p.active));

    if (filters.search) {
      const searchTerms = filters.search.toLowerCase().split(' ');
      filtered = filtered.filter(p => {
        const searchParts = [p.name, p.description, p.category.name, p.unit.full];
        return this.hs.containsFuzzyAll(searchParts, searchTerms);
      })
    }

    if (filters.categories) {
      filtered = filtered.filter(p => filters.categories.includes(p.category.id))
    }

    return filtered;
  }

}
