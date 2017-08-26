import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Rx';

import { EventService } from '../shared/event.service';
import { Product } from '../../shared/models/product';

declare var window: any;

@Component({
  selector: 'il-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit, OnDestroy {

  categories: any;
  scrollSubscription: Subscription;

  constructor(private route: ActivatedRoute, private es: EventService) { }

  ngOnInit() {
    console.log(this.es.productListScrollPosition);

    const products = this.route.snapshot.data['products'];
    const categories = {};

    /* `products` is a list of products each with one category assigned.
    transform this to a list of categories each with a list of assigned products */
    products.forEach(p => {
      const key = p.category.id;
      if (!categories.hasOwnProperty(key)) {
        categories[key] = p.category;
        categories[key].products = [];
      };

      categories[key].products.push(p);
    });
    this.categories = Object.keys(categories).map(k => categories[k]);

    this.scrollSubscription = Observable.fromEvent(window, 'scroll')
      .debounceTime(500)
      .subscribe(() => this.es.productListScrollPosition = window.pageYOffset);

    window.scrollTo(0, this.es.productListScrollPosition);
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

}
