import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { WorkingSlot } from './../../models/workingslot.model'
import * as WorkingSlotActions from './../../actions/tutorial.actions';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from './../../components/course-dialog/course-dialog.component';
import { getWorkingSlotForDay } from './../../reducers/tutorial.reducer';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import * as moment from 'moment';
// import { UUID } from 'angular2-uuid';


import { Action, createSelector, createFeatureSelector, select } from '@ngrx/store'

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() date: Date;
  employers: Employer[] = [];


  workingSlots: Observable<WorkingSlot[]>;


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private employerService: EmployerService,
  ) {
    // this.workingSlots = store.select(state => {
    //   return state.tutorial.filter(x => {
    //     return sameDay(x.date, this.date)
    //   })
    // });
  }

  // TODO: factoriwe that, or see how we can better manage that without the ngOnChanges...
  ngOnChanges() {
    this.workingSlots = this.store.select(state => {
      if (state.workingSlots  != null) {
        return state.workingSlots.filter(x => {
          console.log("x: ", x)
          return sameDay(x.date, this.date)
        })
      } else {
        console.log('state: ', state)
        return []
      }
    });
  }


  ngOnInit() {
    this.getEmployers();
  }

  getEmployers(): void {
    this.employerService.getEmployers()
      .subscribe(employers => {
        this.employers = employers;
        console.log('employers: ', employers) 
      });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(this.date)
    console.log(this.date.constructor.name)


    dialogConfig.data = {
      date: this.date
    };


    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data != null){
          console.log("Dialog output:", data)
          
          let t1 = moment(data.date).add(moment.duration(data.startTime))
          let t2 = moment(data.date).add(moment.duration(data.endTime))
          let d = moment.duration(t2.diff(t1))
          console.log(t1)
          console.log(t2)
          console.log(d)

          let x: WorkingSlot = {
            // id: UUID.UUID(),
            id: "1",

            date: data.date,
            employer: data.employer,
            startTime: data.startTime,
            endTime: data.endTime,
            duration: d,
            date2: moment(data.date)
          }

          this.store.dispatch(new WorkingSlotActions.AddWorkingSlot(x))
        }
      }
    );
  }
}


function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}