import { TestBed } from '@angular/core/testing';

import { InvoiceProductService } from './invoice-product.service';

describe('InvoiceProductService', () => {
  let service: InvoiceProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
