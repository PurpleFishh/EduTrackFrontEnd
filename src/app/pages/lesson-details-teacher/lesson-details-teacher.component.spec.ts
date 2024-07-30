import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailsTeacherComponent } from './lesson-details-teacher.component';

describe('LessonDetailsTeacherComponent', () => {
  let component: LessonDetailsTeacherComponent;
  let fixture: ComponentFixture<LessonDetailsTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonDetailsTeacherComponent]
    });
    fixture = TestBed.createComponent(LessonDetailsTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
