import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonActionAreaComponent } from './lesson-action-area.component';

describe('LessonActionAreaComponent', () => {
  let component: LessonActionAreaComponent;
  let fixture: ComponentFixture<LessonActionAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonActionAreaComponent]
    });
    fixture = TestBed.createComponent(LessonActionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
