import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousComponent } from './tous.component';

describe('TousComponent', () => {
  let component: TousComponent;
  let fixture: ComponentFixture<TousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TousComponent]
    });
    fixture = TestBed.createComponent(TousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
