import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateComparisonComponent } from './rate-comparison.component';

describe('RateComparisonComponent', () => {
  let component: RateComparisonComponent;
  let fixture: ComponentFixture<RateComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateComparisonComponent]
    });
    fixture = TestBed.createComponent(RateComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
