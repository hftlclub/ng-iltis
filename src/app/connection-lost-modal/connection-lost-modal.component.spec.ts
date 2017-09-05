import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionLostModalComponent } from './connection-lost-modal.component';

describe('ConnectionLostModalComponent', () => {
  let component: ConnectionLostModalComponent;
  let fixture: ComponentFixture<ConnectionLostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionLostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionLostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
