import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { Product } from '../../shared/models/product';

@Component({
  selector: 'il-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent implements OnInit {
  @Input() product: Product;
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<any>();
  @Input() loading = false;
  @Input() hideInOutSwitcher = false;
  @Input() hideStorageCounterSwitcher = false;
  @Input() noCounterRemoval = false;
  @Input() outgoingTransfer = true;
  @Input() uiMode = 'event';

  form: FormGroup;
  storageTransfer = true;
  storageCounterSelectionDone = false; // true when user has selected storage/counter for private removals
  grid: any;

  constructor() {}

  ngOnInit() {
    this.grid = this.getGrid(this.product.sizes.length + this.product.crateTypes.length);

    this.form = new FormGroup(
      {
        sizeTypes: new FormArray(this.product.sizes.map(s => new FormControl(0))),
        crateTypes: new FormArray(this.product.crateTypes.map(c => new FormControl(0)))
      },
      this.atLeastOneValidator
    );
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

  setStorageTransfer(value: boolean) {
    this.storageTransfer = value;
    this.storageCounterSelectionDone = true;
  }

  get isPrivateRemoval() {
    return this.uiMode === 'private';
  }

  atLeastOneValidator(controlGroup: FormGroup) {
    const st = controlGroup.get('sizeTypes') as FormArray;
    const ct = controlGroup.get('crateTypes') as FormArray;

    return ct.controls.some(e => e.value) || st.controls.some(e => e.value) ? null : { atLeastOne: false };
  }

  getGrid(sizesLength: number) {
    const map = {
      1: { col: 4, offset: 4 },
      2: { col: 3, offset: 2 },
      3: { col: 4, offset: 0 },
      4: { col: 3, offset: 0 }
    };
    return map[sizesLength] || { col: 2, offset: 0 };
  }

  getString(name: string): string {
    const strings = {
      boxHeadlineOut: {
        event: 'Neue Entnahme',
        purchase: '',
        private: 'Neue Spontanentnahme'
      },
      boxHeadlineIn: {
        event: 'Neue Rückgabe',
        purchase: 'Neuer Einkauf',
        private: ''
      },
      btnInLabel: {
        event: 'Zurücklegen',
        purchase: 'Einlagern',
        private: ''
      },
      btnOutLabel: {
        event: 'Entnehmen',
        purchase: '',
        private: 'Entnehmen'
      }
    };

    return strings[name][this.uiMode];
  }
}
