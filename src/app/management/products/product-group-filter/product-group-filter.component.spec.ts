import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupFilterComponent } from './product-group-filter.component';

describe('ProductGroupFilterComponent', () => {
  let component: ProductGroupFilterComponent;
  let fixture: ComponentFixture<ProductGroupFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
