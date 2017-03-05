import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseFormComponent } from './close-form.component';

describe('CloseFormComponent', () => {
  let component: CloseFormComponent;
  let fixture: ComponentFixture<CloseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
