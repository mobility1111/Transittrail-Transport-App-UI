import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoouteFormComponent } from './rooute-form.component';

describe('RoouteFormComponent', () => {
  let component: RoouteFormComponent;
  let fixture: ComponentFixture<RoouteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoouteFormComponent]
    });
    fixture = TestBed.createComponent(RoouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
