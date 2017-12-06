import { TestBed, inject } from '@angular/core/testing';

import { BarcodeScannerService } from './barcode-scanner.service';

describe('BarcodeScannerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarcodeScannerService]
    });
  });

  it('should be created', inject([BarcodeScannerService], (service: BarcodeScannerService) => {
    expect(service).toBeTruthy();
  }));
});
