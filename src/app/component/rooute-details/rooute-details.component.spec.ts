import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoouteDetailsComponent } from './rooute-details.component';

describe('RoouteDetailsComponent', () => {
  let component: RoouteDetailsComponent;
  let fixture: ComponentFixture<RoouteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoouteDetailsComponent]
    });
    fixture = TestBed.createComponent(RoouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
