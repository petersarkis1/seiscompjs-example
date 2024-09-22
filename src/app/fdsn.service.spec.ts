import { TestBed } from '@angular/core/testing';

import { FdsnService } from './fdsn.service';

describe('FdsnService', () => {
  let service: FdsnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdsnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
