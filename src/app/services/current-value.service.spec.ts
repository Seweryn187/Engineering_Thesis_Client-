import { TestBed } from '@angular/core/testing';

import { CurrentValueService } from './current-value.service';

describe('CurrentValueService', () => {
  let service: CurrentValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
