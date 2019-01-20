import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-email-summary-dialog',
  templateUrl: './email-summary-dialog.component.html',
  styleUrls: ['./email-summary-dialog.component.css']
})
export class EmailSummaryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EmailSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log("data: ", data)
  }
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  static openDialog(dialog: MatDialog) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    dialogConfig.data = {

    };


    const dialogRef = dialog.open(EmailSummaryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
      });
  }


}
