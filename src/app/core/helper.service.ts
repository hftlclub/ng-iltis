import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  commaToDotString(val: string): string {
    return val.replace(/\,/g, '.');
  }

  commaToNumber(val: string): number {
    return parseFloat(val.replace(/\,/g, '.'));
  }

  dotToComma(val: number | string): string {
    return val.toString().replace(/\./g, ',');
  }

}
