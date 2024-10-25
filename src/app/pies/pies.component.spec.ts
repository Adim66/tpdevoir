import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiesComponent } from './pies.component';

describe('PiesComponent', () => {
  let component: PiesComponent;
  let fixture: ComponentFixture<PiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PiesComponent]
    });
    fixture = TestBed.createComponent(PiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
