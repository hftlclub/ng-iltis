import { GroupFilters } from './group-filters';

export interface Filters {
  categories: number[];
  search: string;
  groupFilters: GroupFilters;
}
