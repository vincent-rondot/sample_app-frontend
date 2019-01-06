import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { WorkingSlot } from './../../models/workingslot.model';
import { AppState } from './../../app.state';
import * as TutorialActions from './../../actions/tutorial.actions';
import { getState, getWorkingDays } from './../../reducers/tutorial.reducer';

@Component({
  selector: 'app-rawsummary',
  templateUrl: './rawsummary.component.html',
  styleUrls: ['./rawsummary.component.css']
})
export class RawsummaryComponent implements OnInit {

  workingSlots: Observable<WorkingSlot[]>;

  constructor(private store: Store<AppState>) { 
    this.workingSlots = store.select('workingSlots');
    // this.tutorials = getWorkingDays(store)
  }


  delWorkingSlot(index) {
    this.store.dispatch(new TutorialActions.RemoveWorkingSlot(index) )
  }

  ngOnInit() {
  }

}
