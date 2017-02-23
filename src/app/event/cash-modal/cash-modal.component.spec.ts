import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashModalComponent } from './cash-modal.component';

describe('CashModalComponent', () => {
  let component: CashModalComponent;
  let fixture: ComponentFixture<CashModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
