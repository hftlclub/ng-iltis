import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerModalComponent } from './timepicker-modal.component';

describe('TimepickerModalComponent', () => {
  let component: TimepickerModalComponent;
  let fixture: ComponentFixture<TimepickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimepickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
