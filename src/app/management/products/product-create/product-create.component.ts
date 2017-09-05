import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

import { Product } from '../../../shared/models/product';
import { Unit } from '../../../shared/models/unit';
import { Category } from '../../../shared/models/category';
import { ProductService } from '../../../core/product.service';
import { UnitsService } from '../../shared/units.service';
import { CategoriesService } from '../../shared/categories.service';

@Component({
  selector: 'il-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  units$: Observable<Unit[]>;
  categories$: Observable<Category[]>;
  hasChanges = false;
  loading = false;

  constructor(
    private us: UnitsService,
    private cs: CategoriesService,
    private ps: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private ns: NotificationsService
  ) { }

  ngOnInit() {
    this.units$ = this.us.getAll();
    this.categories$ = this.cs.getAll();
  }

  createProduct(formValue: any) {
    const product = formValue as Product;

    this.loading = true;
    this.ps.create(product).subscribe(p => {
      this.loading = false;
      this.hasChanges = false;
      this.ns.success('Produkt angelegt', 'Das neue Produkt wurde angelegt.')
      this.goToProductDetails(p.id);
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Ein Fehler ist aufgetreten.');
    });
  }

  goToProductDetails(id: number | string) {
    this.router.navigate(['..', id], { relativeTo: this.route });
  }

  goToProductList() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }

}
