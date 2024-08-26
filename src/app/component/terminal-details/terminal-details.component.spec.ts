import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalDetailsComponent } from './terminal-details.component';

describe('TerminalDetailsComponent', () => {
  let component: TerminalDetailsComponent;
  let fixture: ComponentFixture<TerminalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminalDetailsComponent]
    });
    fixture = TestBed.createComponent(TerminalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
