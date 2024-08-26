import { TestBed } from '@angular/core/testing';

import { RateComparisonService } from './rate-comparison.service';

describe('RateComparisonService', () => {
  let service: RateComparisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
