import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalButtonFooterComponent } from './modal-button-footer.component';

describe('ModalButtonFooterComponent', () => {
  let component: ModalButtonFooterComponent;
  let fixture: ComponentFixture<ModalButtonFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalButtonFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalButtonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
