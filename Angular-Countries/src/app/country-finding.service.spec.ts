import { TestBed } from '@angular/core/testing';

import { CountryFindingService } from './country-finding.service';

describe('CountryFindingService', () => {
  let service: CountryFindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
