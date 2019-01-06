import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingslotComponent } from './workingslot.component';

describe('WorkingslotComponent', () => {
  let component: WorkingslotComponent;
  let fixture: ComponentFixture<WorkingslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
