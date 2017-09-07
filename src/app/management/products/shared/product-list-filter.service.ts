import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductListFilterService {

  searchFilter = new BehaviorSubject<string>('');

  filters = new BehaviorSubject<Filters>({
    categories: [],
    search: '',
    groupFilters: {
      active: true,
      inactive: true
    }
  })

  constructor() { }

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
