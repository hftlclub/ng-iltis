import { HelperService } from '../../core/helper.service';
import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

import * as mexp from 'math-expression-evaluator';

@Directive({
  selector: '[ilMathEval]'
})
export class MathEvalInputDirective  {

  @Input() roundToInt = false;

  constructor(private control: NgControl, private hs: HelperService) {}

  @HostListener('change') onChange() {
    const evaluated = this.evaluateExp(this.hs.commaToDotString(this.control.value));
    this.control.control.setValue(this.hs.dotToComma(evaluated));
  }

  evaluateExp(exp: any): number {
    let value = 0;
    try {
      value = mexp.eval(exp);
    } catch (e) {}

    if (this.roundToInt) { value = Math.ceil(value); }
    return value;
  }



}
