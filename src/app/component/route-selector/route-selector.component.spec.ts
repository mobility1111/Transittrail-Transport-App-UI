import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSelectorComponent } from './route-selector.component';

describe('RouteSelectorComponent', () => {
  let component: RouteSelectorComponent;
  let fixture: ComponentFixture<RouteSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouteSelectorComponent]
    });
    fixture = TestBed.createComponent(RouteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
