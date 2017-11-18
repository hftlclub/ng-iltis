import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function commaToDotString(val: string): string {
  return val.replace(/\,/g, '.');
}

export class IlValidators {
  static notZero(control: AbstractControl): ValidationErrors | null {
    return control.value === '0' || control.value === 0
      ? { notZero: { valid: false } }
      : null;
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value = parseFloat(commaToDotString(control.value));
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value < min
        ? { min: { min: min, actual: control.value } }
        : null;
    };
  }
}
