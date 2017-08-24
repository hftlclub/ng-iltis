import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateTypesComponent } from './crate-types.component';

describe('CrateTypesComponent', () => {
  let component: CrateTypesComponent;
  let fixture: ComponentFixture<CrateTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrateTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
