import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCratesTableComponent } from './product-crates-table.component';

describe('ProductCratesTableComponent', () => {
  let component: ProductCratesTableComponent;
  let fixture: ComponentFixture<ProductCratesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCratesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCratesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
