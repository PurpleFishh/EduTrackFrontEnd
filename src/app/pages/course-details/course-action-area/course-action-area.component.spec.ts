import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseActionAreaComponent } from './course-action-area.component';

describe('CourseActionAreaComponent', () => {
  let component: CourseActionAreaComponent;
  let fixture: ComponentFixture<CourseActionAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseActionAreaComponent]
    });
    fixture = TestBed.createComponent(CourseActionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
