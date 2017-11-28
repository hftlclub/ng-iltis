import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountLandingComponent } from './count-landing.component';

describe('CountLandingComponent', () => {
  let component: CountLandingComponent;
  let fixture: ComponentFixture<CountLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
