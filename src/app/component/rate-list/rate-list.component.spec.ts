import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateListComponent } from './rate-list.component';

describe('RateListComponent', () => {
  let component: RateListComponent;
  let fixture: ComponentFixture<RateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateListComponent]
    });
    fixture = TestBed.createComponent(RateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
