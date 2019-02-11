import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './../../store/reducers/index';
import { WorkingSlot } from './../../models/workingslot.model'
import * as WorkingSlotActions from './../../store/actions/tutorial.actions';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from './../../components/course-dialog/course-dialog.component';
import { getWorkingSlotForDay } from './../../store/reducers/tutorial.reducer';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import * as moment from 'moment';
import * as fromStore from './../../store/reducers/index';


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
    private store: Store<State>,
    private dialog: MatDialog,
  ) {
  }

  ngOnChanges() {
    this.workingSlots = this.store.select(fromStore.getWorkingSlotForDay(this.date));
  }


  ngOnInit() {
    this.getEmployers();
  }

  getEmployers(): void {
    let employers = this.store.select(fromStore.getEmployers);
    employers.subscribe(employers => {
      this.employers = employers;
      console.log('employers: ', employers)
    });


    // this.employerService.getEmployers()
    //   .subscribe(employers => {
    //     this.employers = employers;
    //     console.log('employers: ', employers)
    //   });
  }

  new() {
    let x: WorkingSlot = {
      id: undefined,
      date: this.date,
      employer: undefined,
      startTime: undefined,
      endTime: undefined,
      duration: undefined,
      date2: undefined
    }
    CourseDialogComponent.openDialog(this.dialog, this.store, x)
  }
}


function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}