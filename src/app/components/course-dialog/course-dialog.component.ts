import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import { MatDialog, MatDialogConfig } from "@angular/material";
import * as moment from 'moment';
import { WorkingSlot } from './../../models/workingslot.model'
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as fromStore from './../../store/reducers/index';
import * as WorkingSlotActions from './../../store/actions/tutorial.actions';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  employers: Employer[] = [];

  form: FormGroup;
  date: Date;
  workingSlot: WorkingSlot;
  updateMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)
    this.date = data.date;
    this.workingSlot = data.workingSlot;
    this.updateMode = !(this.workingSlot == undefined || this.workingSlot.id == undefined)
  }

  ngOnInit() {
    this.getEmployers();

    console.log(this.workingSlot)
    if (this.workingSlot != undefined) {
      this.form = this.fb.group({
        date: new FormControl({value: this.workingSlot.date, disabled: true}, Validators.required),
        employer: [this.workingSlot.employer, Validators.required],
        startTime: [this.workingSlot.startTime],
        endTime: [this.workingSlot.endTime]
      });
    } else {
      this.form = this.fb.group({
        date: [this.date, Validators.required],
        employer: [null, Validators.required],
        startTime: [],
        endTime: []
      });
    }


  }

  getEmployers(): void {
    let employers = this.store.select(fromStore.getEmployers);
    employers.subscribe(employers => this.employers = employers);
  }

  compareSelectValues(selectedValue, compareValue): boolean {
    return selectedValue.id === compareValue.id;
  }

  save() {
    if (this.form.invalid) {
      // TODO : do better...
      // Manage form validation
      // Ex: http://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
      alert("Invalid")
    } else {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }

  static echo(x) {
    return x
  }

  static openDialog(dialog: MatDialog, store: Store<AppState>, workingSlot: WorkingSlot) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(workingSlot.date)
    console.log(workingSlot.date.constructor.name)



    dialogConfig.data = {
      workingSlot: workingSlot
    };


    const dialogRef = dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null) {
          console.log("Dialog output:", data)

          let t1 = moment(data.date).add(moment.duration(data.startTime))
          let t2 = moment(data.date).add(moment.duration(data.endTime))
          let d = moment.duration(t2.diff(t1))
          console.log(t1)
          console.log(t2)
          console.log(d)

          console.log("workingSlot1 ", workingSlot)
          let updateMode = !(workingSlot == undefined || workingSlot.id == undefined)


          let x: WorkingSlot = {
            // id: updateMode?workingSlot.id:UUID.UUID(),
            id: updateMode ? workingSlot.id : UUID.UUID(),

            date: data.date,
            employer: data.employer,
            startTime: data.startTime,
            endTime: data.endTime,
            duration: d,
            date2: moment(data.date)
          }


          console.log("workingSlot: ",workingSlot)
          if (updateMode) {
            store.dispatch(new WorkingSlotActions.UpdateWorkingSlot(x))

          } else {
            store.dispatch(new WorkingSlotActions.AddWorkingSlot(x))

          }
        }
      }
    );
  }
}

