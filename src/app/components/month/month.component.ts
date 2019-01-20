import { Component, OnInit, Input } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import { Observable } from 'rxjs/Observable';
import { WorkingSlot } from './../../models/workingslot.model'
import { createSelector } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { getWorkingSlotForMonth, sameDay } from './../../store/reducers/tutorial.reducer';
import { tap, map } from 'rxjs/operators';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import * as fromStore from './../../store/reducers/index';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from './../../components/course-dialog/course-dialog.component';
import { EmailSummaryDialogComponent } from './../../components/email-summary-dialog/email-summary-dialog.component';


EmailSummaryDialogComponent

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {
  @Input() date: Date;
  employers$: Observable<Employer[]>;
  workingSlots: Observable<WorkingSlot[]>;
  monthlySummary: Observable<MonthlySummary>;


  constructor(
    private employerService: EmployerService,
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.employers$ = this.employerService.getEmployers()


    this.workingSlots = this.store.select(fromStore.getWorkingSlotForMonth(this.date));

  }

  ngOnChanges() {
    this.workingSlots = this.store.select(fromStore.getWorkingSlotForMonth(this.date));
  }


  editWorkingSlot(workingSlots) {
    console.log(workingSlots)
    console.log (CourseDialogComponent.echo("xxx"))
    CourseDialogComponent.openDialog(this.dialog, this.store, workingSlots)

  }

  getAllDays(employerId) {
    console.log("getAllDays")
    return this.workingSlots.pipe(
      map(
        (wss: WorkingSlot[]) => {
          let allDays = wss
            .filter(ws => ws.employer.id == employerId)
            .reduce((accu, ws) => {
              if (!(ws.date.toString() in accu)) {
                accu[ws.date.toString()] = ws.date
              }
              return accu
            }, {})
          return Object.values(allDays)
        }
      ),
      tap(x => console.log("getAllDays result:", x))
    )
  }

  getAllWorkingSlot(employerId, day) {
    console.log("getAllWorkingSlot")
    return this.workingSlots.pipe(
      map(
        wss => wss
          .filter(ws => ws.employer.id == employerId)
          .filter(ws => sameDay(ws.date, day))
      ),
      tap(x => console.log("getAllWorkingSlot result:", x))
    )
  }


  send() {
    console.log("send...")
    EmailSummaryDialogComponent.openDialog(this.dialog)
  }
}


interface MonthlySummary {
  monthlySummaryPerEmployer: MonthlySummaryPerEmployer[];
}

interface MonthlySummaryPerEmployer {
  employer: Employer;
  daySummary: DaySummary[];
}

interface DaySummary {
  date: Date;
  workingSlots: WorkingSlot[];
}

function computeMonthlySummary(wss: WorkingSlot[]): any {
  let initalValue: any = {}
  console.log("wss: ", wss)

  let x = wss
    .reduce((accu, ws) => {
      let employerId = ws.employer.id;
      console.log("ws: ", ws)

      console.log("employerId: ", employerId)
      if (employerId in accu) {
        accu[employerId] = [...accu.employerId, ws];
      } else {
        accu[employerId] = [ws];
      }
      return accu;
    }, initalValue)
  console.log("x: ", x)
  Object.entries(x).map(x => { })
}



