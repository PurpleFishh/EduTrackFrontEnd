import { TestBed } from '@angular/core/testing';

import { AssignmentInventoryService } from './assignment-inventory-service.service';

describe('AssignmentInventoryServiceService', () => {
  let service: AssignmentInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
