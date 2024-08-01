import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePresentationComponent } from './course-presentation.component';

describe('CoursePresentationComponent', () => {
  let component: CoursePresentationComponent;
  let fixture: ComponentFixture<CoursePresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursePresentationComponent]
    });
    fixture = TestBed.createComponent(CoursePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
