import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarActionComponent } from './navbar-action.component';

describe('NavbarActionComponent', () => {
  let component: NavbarActionComponent;
  let fixture: ComponentFixture<NavbarActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarActionComponent]
    });
    fixture = TestBed.createComponent(NavbarActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
