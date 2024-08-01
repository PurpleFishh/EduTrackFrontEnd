import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDisplayCardComponent } from './lesson-display-card.component';

describe('LessonDisplayCardComponent', () => {
  let component: LessonDisplayCardComponent;
  let fixture: ComponentFixture<LessonDisplayCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonDisplayCardComponent]
    });
    fixture = TestBed.createComponent(LessonDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
