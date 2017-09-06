import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { NotificationsService } from 'angular2-notifications';

import { IlValidators } from '../../../../core/il-validators';
import { Product } from '../../../../shared/models/product';
import { CrateType } from '../../../../shared/models/cratetype';
import { ProductService } from '../../../../core/product.service';

@Component({
  selector: 'il-product-crate-create',
  templateUrl: './product-crate-create.component.html',
  styleUrls: ['./product-crate-create.component.css']
})
export class ProductCrateCreateComponent implements OnInit {

  @Input() product: Product;
  @Output() crateTypeAdded = new EventEmitter<any>();
  crateTypes$: Observable<CrateType[]>;
  loading = false;
  form: FormGroup;

  constructor(private ps: ProductService, private ns: NotificationsService) { }

  ngOnInit() {
    this.crateTypes$ = this.ps.getPossibleCrateTypesForProduct(this.product.id);

    this.form = new FormGroup({
      crateType: new FormControl(0, IlValidators.notZero)
    });
  }

  submitForm() {
    const crateType = { id: parseInt(this.form.value.crateType, 0) } as CrateType;

    this.loading = true;
    this.ps.createCrateTypeForProduct(this.product.id, crateType).subscribe(() => {
      this.loading = false;
      this.ns.success('Kasten hinzugefügt', 'Kastengröße für das Produkt wurde hinzugefügt.')
      this.crateTypeAdded.emit();
      this.ps.productUpdated.emit();
    },
    err => {
      this.loading = false;
      this.ns.error('Fehler', 'Vorgang abgebrochen');
    });
  }

}
