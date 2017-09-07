import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryFilterComponent } from './product-category-filter.component';

describe('ProductCategoryFilterComponent', () => {
  let component: ProductCategoryFilterComponent;
  let fixture: ComponentFixture<ProductCategoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
