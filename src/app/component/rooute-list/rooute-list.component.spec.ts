import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoouteListComponent } from './rooute-list.component';

describe('RoouteListComponent', () => {
  let component: RoouteListComponent;
  let fixture: ComponentFixture<RoouteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoouteListComponent]
    });
    fixture = TestBed.createComponent(RoouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
