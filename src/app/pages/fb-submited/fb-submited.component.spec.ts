import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbSubmitedComponent } from './fb-submited.component';

describe('FbSubmitedComponent', () => {
  let component: FbSubmitedComponent;
  let fixture: ComponentFixture<FbSubmitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FbSubmitedComponent]
    });
    fixture = TestBed.createComponent(FbSubmitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
