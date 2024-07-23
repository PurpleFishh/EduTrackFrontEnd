import { TestBed } from '@angular/core/testing';

import { RestBaseService } from './rest-base.service';

describe('RestBaseService', () => {
  let service: RestBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
