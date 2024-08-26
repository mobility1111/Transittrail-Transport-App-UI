import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRooutesComponent } from './featured-rooutes.component';

describe('FeaturedRooutesComponent', () => {
  let component: FeaturedRooutesComponent;
  let fixture: ComponentFixture<FeaturedRooutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedRooutesComponent]
    });
    fixture = TestBed.createComponent(FeaturedRooutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
