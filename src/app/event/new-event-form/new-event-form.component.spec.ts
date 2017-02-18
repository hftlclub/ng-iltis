import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventFormComponent } from './new-event-form.component';

describe('NewEventFormComponent', () => {
  let component: NewEventFormComponent;
  let fixture: ComponentFixture<NewEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
