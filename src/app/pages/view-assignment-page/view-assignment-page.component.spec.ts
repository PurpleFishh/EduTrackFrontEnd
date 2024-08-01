import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignmentPageComponent } from './view-assignment-page.component';

describe('ViewAssignmentPageComponent', () => {
  let component: ViewAssignmentPageComponent;
  let fixture: ComponentFixture<ViewAssignmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssignmentPageComponent]
    });
    fixture = TestBed.createComponent(ViewAssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
