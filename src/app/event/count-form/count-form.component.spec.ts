import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountFormComponent } from './count-form.component';

describe('CountFormComponent', () => {
  let component: CountFormComponent;
  let fixture: ComponentFixture<CountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
