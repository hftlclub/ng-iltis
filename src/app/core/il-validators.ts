import { FormControl } from '@angular/forms';

export class IlValidators {
  static notZero(control: FormControl): { [error: string]: any } {
    return control.value === '0' || control.value === 0  ? { notZero: { valid: false } } : null;
  }
}
