import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDashboardCourseComponent } from './teacher-dashboard-course.component';

describe('TeacherDashboardCourseComponent', () => {
  let component: TeacherDashboardCourseComponent;
  let fixture: ComponentFixture<TeacherDashboardCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherDashboardCourseComponent]
    });
    fixture = TestBed.createComponent(TeacherDashboardCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
