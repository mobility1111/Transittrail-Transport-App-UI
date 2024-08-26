import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLineFormComponent } from './transport-line-form.component';

describe('TransportLineFormComponent', () => {
  let component: TransportLineFormComponent;
  let fixture: ComponentFixture<TransportLineFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportLineFormComponent]
    });
    fixture = TestBed.createComponent(TransportLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
