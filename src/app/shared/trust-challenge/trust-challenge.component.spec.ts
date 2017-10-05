import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustChallengeComponent } from './trust-challenge.component';

describe('TrustChallengeComponent', () => {
  let component: TrustChallengeComponent;
  let fixture: ComponentFixture<TrustChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
