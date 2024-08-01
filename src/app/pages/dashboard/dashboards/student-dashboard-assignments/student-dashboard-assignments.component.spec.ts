import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardAssignmentsComponent } from './student-dashboard-assignments.component';

describe('StudentDashboardAssignmentsComponent', () => {
  let component: StudentDashboardAssignmentsComponent;
  let fixture: ComponentFixture<StudentDashboardAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDashboardAssignmentsComponent]
    });
    fixture = TestBed.createComponent(StudentDashboardAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
