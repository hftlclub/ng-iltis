import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventSelectionComponent } from './new-event-selection.component';

describe('NewEventSelectionComponent', () => {
  let component: NewEventSelectionComponent;
  let fixture: ComponentFixture<NewEventSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
