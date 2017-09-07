import { HelperService } from '../../../core/helper.service';
import { ProductService } from '../../../core/product.service';
import { Product } from '../../../shared/models/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductListFilterService {

  products$ = new BehaviorSubject<Product[]>([]);
  productsFiltered$ = new BehaviorSubject<Product[]>([]);

  searchFilter$ = new BehaviorSubject<string>('');
  groupFilter$ = new BehaviorSubject<GroupFilters>({
    active: true,
    inactive: true
  })

  filters$ = new BehaviorSubject<Filters>({
    categories: [],
    search: '',
    groupFilters: {
      active: true,
      inactive: true
    }
  })

  constructor(private ps: ProductService, private hs: HelperService) {
    Observable.combineLatest(
      this.searchFilter$,
      this.groupFilter$,
      (search, group) => ({
        search: search,
        groupFilters: group,
        categories: []
      }))
      .subscribe(v => this.filters$.next(v));

    this.filters$.subscribe(f => {
      this.productsFiltered$.next(this.filterProducts(this.products$.getValue(), f));
    });

    this.products$.subscribe(p => {
      this.productsFiltered$.next(this.filterProducts(p, this.filters$.getValue()));
    });
  }

  refreshProducts() {
    this.ps.getAll(true, true).subscribe(p => this.products$.next(p));
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

    return filtered;
  }

}


interface Filters {
  categories: number[];
  search: string;
  groupFilters: GroupFilters;
}

interface GroupFilters {
  active: boolean;
  inactive: boolean;
}
