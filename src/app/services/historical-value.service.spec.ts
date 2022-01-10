import { TestBed } from '@angular/core/testing';

import { HistoricalValueService } from './historical-value.service';

describe('HistoricalValueService', () => {
  let service: HistoricalValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
