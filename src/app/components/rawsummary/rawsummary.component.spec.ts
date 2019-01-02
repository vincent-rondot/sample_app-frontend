import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawsummaryComponent } from './rawsummary.component';

describe('RawsummaryComponent', () => {
  let component: RawsummaryComponent;
  let fixture: ComponentFixture<RawsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
