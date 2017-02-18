import { Component, OnChanges, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'il-counter-control',
  templateUrl: './counter-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterControlComponent),
      multi: true
    }
  ]
})
export class CounterControlComponent implements ControlValueAccessor {
  private _counterValue = 0;

  @Input() minValue: number = -Infinity;
  @Input() maxValue: number = Infinity;

  propagateChange: any = () => {};
  validateFn: any = () => {};

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(val);
  }

  writeValue(value) {
    if (value) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  increase() {
    if(this.counterValue < this.maxValue) {
      this.counterValue++;
    }
  }

  decrease() {
    if (this.counterValue > this.minValue) {
      this.counterValue--;
    }
  }


}
