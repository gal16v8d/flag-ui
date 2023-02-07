import { TestBed } from '@angular/core/testing';

import { AppdbService } from './appdb.service';

describe('AppdbService', () => {
  let service: AppdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
