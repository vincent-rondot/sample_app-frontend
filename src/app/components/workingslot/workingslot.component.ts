import { Component, OnInit, Input } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WorkingSlot } from './../../models/workingslot.model'
import { AppState } from './../../app.state';

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


}

function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
