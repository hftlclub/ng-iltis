import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeTypesComponent } from './size-types.component';

describe('SizeTypesComponent', () => {
  let component: SizeTypesComponent;
  let fixture: ComponentFixture<SizeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
