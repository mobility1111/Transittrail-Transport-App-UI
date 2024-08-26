import { TestBed } from '@angular/core/testing';

import { RoouteService } from './rooute.service';

describe('RoouteService', () => {
  let service: RoouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
