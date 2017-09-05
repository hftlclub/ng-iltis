import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchFilterComponent } from './product-search-filter.component';

describe('ProductSearchFilterComponent', () => {
  let component: ProductSearchFilterComponent;
  let fixture: ComponentFixture<ProductSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
