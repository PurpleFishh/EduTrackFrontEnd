import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCardsComponent } from './testimonial-cards.component';

describe('TestimonialCardsComponent', () => {
  let component: TestimonialCardsComponent;
  let fixture: ComponentFixture<TestimonialCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialCardsComponent]
    });
    fixture = TestBed.createComponent(TestimonialCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
