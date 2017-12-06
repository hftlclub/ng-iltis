import { Router } from '@angular/router';
import { buffer, debounce, debounceTime, filter, map, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BarcodeScannerService {

  scannedProducts$: Observable<number>;

  productMap = {
    '41058145': 1,
    '4029764001807': 3,
    '4002627801813': 2
  };

  constructor(private router: Router) {
    const MAX_INTERVAL_BETWEEN_EVENTS_IN_MS = 50;
    const ENTER_KEY_CODE = 13;

    const keyCode$ = Observable.fromEvent(document, 'keypress')
      .pipe(pluck('keyCode'));

    const keyCodesBuffer$ = keyCode$.pipe(
      buffer(keyCode$.pipe(debounceTime(MAX_INTERVAL_BETWEEN_EVENTS_IN_MS))),
      filter(isFromScan),
      map(e => String.fromCharCode(...e).trim())
    );

    function isFromScan(keyCodes) {
      return keyCodes.length > 1 && keyCodes[keyCodes.length - 1] === ENTER_KEY_CODE;
    }

    this.scannedProducts$ = keyCodesBuffer$.pipe(
      map(bc => this.productMap[bc]),
      filter(p => !!p)
    );

    keyCodesBuffer$.subscribe(e => {
      console.log('Barcode scanned:', e);
    });
  }



}


