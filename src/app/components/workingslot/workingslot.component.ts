import { Component, OnInit, Input } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WorkingSlot } from './../../models/workingslot.model'
import { AppState } from './../../app.state';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from './../../components/course-dialog/course-dialog.component';
import * as moment from 'moment';
import * as WorkingSlotActions from './../../actions/tutorial.actions';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-workingslot',
  templateUrl: './workingslot.component.html',
  styleUrls: ['./workingslot.component.css']
})
export class WorkingslotComponent implements OnInit {
  @Input() date: Date;
  @Input() employer: Employer;

  workingSlots: Observable<WorkingSlot[]>;


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,

  ) {
    console.log('Hi!')
   }

  ngOnInit() {
  }

  ngOnChanges() {
    this.workingSlots = this.store.select(state => {
      if (state.workingSlots != null) {
        return state.workingSlots.filter(x => {
          return (sameDay(x.date, this.date) && x.employer.id == this.employer.id)
        })
      } else {
        console.log("store is empty...")
        return []
      }
    });


    
  }

  editWorkingSlot(workingSlots) {
    console.log(workingSlots)
    console.log (CourseDialogComponent.echo("xxx"))
    CourseDialogComponent.openDialg(this.dialog, this.store, workingSlots)
    // this.store.dispatch(new TutorialActions.RemoveWorkingSlot(index) )
    // this.openDialog(index)
  }

  // TODO : factorize duplicated code 
  openDialog(index) {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(this.date)
    console.log(this.date.constructor.name)


    dialogConfig.data = {
      workingSlots: this.workingSlots[index]
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
            id:  UUID.UUID(),
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
