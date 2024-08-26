import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedTransportLinesComponent } from './featured-transport-lines.component';

describe('FeaturedTransportLinesComponent', () => {
  let component: FeaturedTransportLinesComponent;
  let fixture: ComponentFixture<FeaturedTransportLinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedTransportLinesComponent]
    });
    fixture = TestBed.createComponent(FeaturedTransportLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
