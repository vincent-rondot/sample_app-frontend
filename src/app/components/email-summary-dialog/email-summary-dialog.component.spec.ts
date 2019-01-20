import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSummaryDialogComponent } from './email-summary-dialog.component';

describe('EmailSummaryDialogComponent', () => {
  let component: EmailSummaryDialogComponent;
  let fixture: ComponentFixture<EmailSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
