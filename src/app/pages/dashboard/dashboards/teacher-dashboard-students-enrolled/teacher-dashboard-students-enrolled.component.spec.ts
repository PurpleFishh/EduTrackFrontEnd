import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboardStudentsEnrolledComponent } from './teacher-dashboard-students-enrolled.component';

describe('TeacherDashboardStudentsEnrolledComponent', () => {
  let component: TeacherDashboardStudentsEnrolledComponent;
  let fixture: ComponentFixture<TeacherDashboardStudentsEnrolledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherDashboardStudentsEnrolledComponent]
    });
    fixture = TestBed.createComponent(TeacherDashboardStudentsEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
