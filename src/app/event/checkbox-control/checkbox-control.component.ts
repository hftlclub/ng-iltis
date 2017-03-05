import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'il-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true
    }
  ]
})
export class CheckboxControlComponent {

  private _value = false;

  propagateChange: any = () => {};
  validateFn: any = () => {};

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.propagateChange(val);
  }

  toggleValue() {
    this.value = !this._value;
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
