import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkingSlot } from './../../models/workingslot.model'
import { EmployerService } from '../../services/employer.service';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from './../../store/reducers/index';
import * as fromStore from './../../store/reducers/index';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as utils from './../../utils'



@Component({
  selector: 'app-email-summary-dialog',
  templateUrl: './email-summary-dialog.component.html',
  styleUrls: ['./email-summary-dialog.component.css']
})
export class EmailSummaryDialogComponent implements OnInit {

  emailForm: FormGroup;
  dialogData: any;



  constructor(
    private dialogRef: MatDialogRef<EmailSummaryDialogComponent>,
    private store: Store<State>,

    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
    this.dialogData = data
    console.log("data: ", data)
  }
  ngOnInit() {
    console.log("dialogData: ", this.dialogData)



    let totalTime = moment.duration(0);
    let detailStrings = [];
    for (var ws of this.dialogData.worksingSlots) {
      detailStrings.push(`- ${utils.dateFormat(ws.date)} : ${ws.startTime} ->  ${ws.endTime}    (${ws.duration.hours()}h:${ws.duration.minutes()}min)`);
      totalTime = totalTime.add(ws.duration);

    }


    var options = { month: 'long' };
    var month = this.dialogData.date.toLocaleDateString("fr-FR", options)
    var title = "Travail - " + month
    var body = `\
Bonjour, \n\
Voici le detail pour le mois de ${month}\n\
\n\
${detailStrings.join('\n')} \n\n
Total : ${utils.durationFormat(totalTime)} \n
Cordialement,\n\
Sarah\
`


    this.emailForm = this.fb.group({
      to: ["", [
        Validators.required,
        Validators.email,
      ]
      ],
      cc: ["vincent.rondot@gmail.com", [
        Validators.email,
      ]
      ],
      subject: [title],
      body: [body],
    });




    this.store.select(fromStore.getEmployer(this.dialogData.employerId)).subscribe(e => {
      this.emailForm.controls.to.setValue(e.email)
      console.log("Hi Here!")
    })



  }

  close() {
    this.dialogRef.close();
  }

  static openDialog(dialog: MatDialog, employerId: string, worksingSlots: WorkingSlot[], date: Date) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    console.log("employerId: ", employerId)
    console.log("worksingSlots: ", worksingSlots)


    dialogConfig.data = {
      worksingSlots: worksingSlots,
      employerId: employerId,
      date: date,
    };


    const dialogRef = dialog.open(EmailSummaryDialogComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //   data => {
    //   });
  }


}

