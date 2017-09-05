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
  selector: 'il-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
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
    this.product = this.route.snapshot.data.product;
  }

  updateProduct(formValue: any) {
    const product: Product = Object.assign({}, this.product, formValue);

    this.loading = true;
    this.ps.update(this.product.id, product).subscribe(() => {
      this.loading = false;
      this.hasChanges = false;
      this.ns.success('Produkt bearbeitet', 'Das Produkt wurde bearbeitet.')
      this.goToProductDetails();
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Ein Fehler ist aufgetreten.');
    });
  }

  cancel() {
    this.goToProductDetails();
  }

  goToProductDetails() {
    this.router.navigate(['..', 'details'], { relativeTo: this.route });
  }

}
