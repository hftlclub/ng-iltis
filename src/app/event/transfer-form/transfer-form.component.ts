import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {

  icons: { [k: string]: string } = {
    'out': 'fa-sign-out',
    'in': 'fa-sign-in fa-flip-horizontal'
  };

  @Input() product: Product;
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();
  @Input() loading = false;
  @Input() hideInOutSwitcher = false;
  @Input() hideStorageCounterSwitcher = false;

  form: FormGroup;
  outgoingTransfer = true;
  storageTransfer = true;
  grid: any;

  constructor() { }

  ngOnInit() {
    this.grid = this.getGrid(this.product.sizeTypes.length + this.product.crateTypes.length);

    this.form = new FormGroup({
      sizeTypes: new FormArray(this.product.sizeTypes.map(s => new FormControl(0))),
      crateTypes: new FormArray(this.product.crateTypes.map(c => new FormControl(0)))
    }, this.atLeastOneValidator);
  }

  submitForm() {
    this.submitted.emit({
      controls: this.form.controls,
      outgoing: this.outgoingTransfer,
      storage: this.storageTransfer
    });
  }

  cancelForm() {
    this.cancelled.emit();
  }


  atLeastOneValidator(controlGroup: FormGroup) {
    const st = controlGroup.controls['sizeTypes'];
    const ct = controlGroup.controls['crateTypes'];

    return (ct['controls'].some(e => e.value) || st['controls'].some(e => e.value))
      ? null
      : { atLeastOne: false };
  }

  getGrid(sizesLength: number) {
    const map = {
      1: { col: 4, offset: 4 },
      2: { col: 3, offset: 2 },
      3: { col: 4, offset: 0 },
      4: { col: 3, offset: 0 },
    };
    return map[sizesLength] || { col: 2, offset: 0 };
  }
}
