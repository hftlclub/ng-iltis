import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

import * as mexp from 'math-expression-evaluator';

@Directive({
  selector: '[ilMathEval]'
})
export class MathEvalInputDirective  {

  constructor(private control: NgControl) {}

  @HostListener('change') onChange() {
    const evaluated = this.evaluateExp(this.control.value);
    this.control.control.setValue(evaluated);
  }

  evaluateExp(exp: any): number {
    let value = 0;
    try {
      value = Math.ceil(mexp.eval(exp));
    } catch (e) {}

    return value;
  }

}
