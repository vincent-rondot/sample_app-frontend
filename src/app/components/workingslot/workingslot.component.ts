import { Component, OnInit, Input } from '@angular/core';
import { Employer } from '../../models/employer.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WorkingSlot } from './../../models/workingslot.model'
import { AppState } from './../../app.state';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CourseDialogComponent } from './../../components/course-dialog/course-dialog.component';
import * as moment from 'moment';
import * as WorkingSlotActions from './../../store/actions/tutorial.actions';
import * as fromStore from './../../store/reducers/index';
import { map } from 'rxjs/operators';

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
    this.workingSlots = this.store.select(fromStore.getWorkingSlotForDay(this.date)).pipe(
      map(wss=> wss.filter(ws=>ws.employer.id == this.employer.id))
    );

    
  }

  editWorkingSlot(workingSlots) {
    console.log(workingSlots)
    console.log (CourseDialogComponent.echo("xxx"))
    CourseDialogComponent.openDialog(this.dialog, this.store, workingSlots)
  }

  openDialog(index) {
    CourseDialogComponent.openDialog(this.dialog, this.store, this.workingSlots[index])
  }


}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
