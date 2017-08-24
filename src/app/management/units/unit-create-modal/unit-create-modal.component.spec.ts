import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCreateModalComponent } from './unit-create-modal.component';

describe('UnitCreateModalComponent', () => {
  let component: UnitCreateModalComponent;
  let fixture: ComponentFixture<UnitCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
