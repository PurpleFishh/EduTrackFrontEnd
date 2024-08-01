import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teacherOwnerGuard } from './teacher-owner.guard';

describe('teacherOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
