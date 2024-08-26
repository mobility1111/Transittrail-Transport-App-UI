import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLineComponent } from './transport-line.component';

describe('TransportLineComponent', () => {
  let component: TransportLineComponent;
  let fixture: ComponentFixture<TransportLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportLineComponent]
    });
    fixture = TestBed.createComponent(TransportLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
