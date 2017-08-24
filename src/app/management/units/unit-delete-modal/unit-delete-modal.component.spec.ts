import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDeleteModalComponent } from './unit-delete-modal.component';

describe('UnitDeleteModalComponent', () => {
  let component: UnitDeleteModalComponent;
  let fixture: ComponentFixture<UnitDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
