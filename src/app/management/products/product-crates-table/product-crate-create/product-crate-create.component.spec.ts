import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrateCreateComponent } from './product-crate-create.component';

describe('ProductCrateCreateComponent', () => {
  let component: ProductCrateCreateComponent;
  let fixture: ComponentFixture<ProductCrateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCrateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCrateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
