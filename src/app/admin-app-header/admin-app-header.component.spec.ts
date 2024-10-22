import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppHeaderComponent } from './admin-app-header.component';

describe('AdminAppHeaderComponent', () => {
  let component: AdminAppHeaderComponent;
  let fixture: ComponentFixture<AdminAppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
