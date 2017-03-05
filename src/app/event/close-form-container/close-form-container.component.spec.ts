import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFormContainerComponent } from './close-form-container.component';

describe('CloseFormContainerComponent', () => {
  let component: CloseFormContainerComponent;
  let fixture: ComponentFixture<CloseFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
