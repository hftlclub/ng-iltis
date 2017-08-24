import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSizesTableComponent } from './product-sizes-table.component';

describe('ProductSizesTableComponent', () => {
  let component: ProductSizesTableComponent;
  let fixture: ComponentFixture<ProductSizesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSizesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSizesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
