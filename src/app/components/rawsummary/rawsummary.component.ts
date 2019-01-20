import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { WorkingSlot } from './../../models/workingslot.model';
import { AppState } from './../../app.state';
import * as TutorialActions from './../../store/actions/tutorial.actions';
import * as fromStore from './../../store/reducers/index';

@Component({
  selector: 'app-rawsummary',
  templateUrl: './rawsummary.component.html',
  styleUrls: ['./rawsummary.component.css']
})
export class RawsummaryComponent implements OnInit {

  workingSlots: Observable<WorkingSlot[]>;

  constructor(private store: Store<fromStore.State>) { 
  }

  delWorkingSlot(wsId) {
    console.log("deleting: " , wsId)
    this.store.dispatch(new TutorialActions.RemoveWorkingSlot(wsId) )
  }

  ngOnInit() {
    this.workingSlots = this.store.select(fromStore.getWorkingSlot);
  }

}
