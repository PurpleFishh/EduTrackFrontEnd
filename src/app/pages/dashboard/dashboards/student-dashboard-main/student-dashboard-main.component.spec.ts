import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardMainComponent } from './student-dashboard-main.component';

describe('StudentDashboardMainComponent', () => {
  let component: StudentDashboardMainComponent;
  let fixture: ComponentFixture<StudentDashboardMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDashboardMainComponent]
    });
    fixture = TestBed.createComponent(StudentDashboardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
