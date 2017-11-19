import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInventoryComponent } from './event-inventory.component';

describe('EventInventoryComponent', () => {
  let component: EventInventoryComponent;
  let fixture: ComponentFixture<EventInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
