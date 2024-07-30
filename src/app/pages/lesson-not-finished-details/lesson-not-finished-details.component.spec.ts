import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonNotFinishedDetailsComponent } from './lesson-not-finished-details.component';

describe('LessonNotFinishedDetailsComponent', () => {
  let component: LessonNotFinishedDetailsComponent;
  let fixture: ComponentFixture<LessonNotFinishedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonNotFinishedDetailsComponent]
    });
    fixture = TestBed.createComponent(LessonNotFinishedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
