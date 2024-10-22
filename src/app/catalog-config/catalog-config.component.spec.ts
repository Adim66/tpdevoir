import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogConfigComponent } from './catalog-config.component';

describe('CatalogConfigComponent', () => {
  let component: CatalogConfigComponent;
  let fixture: ComponentFixture<CatalogConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
