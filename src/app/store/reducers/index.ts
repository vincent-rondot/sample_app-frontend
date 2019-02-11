import { ActionReducerMap } from '@ngrx/store'
import * as fromWorkingSlots from './tutorial.reducer';
import * as fromEmployers from './employers.reducer';

import { Action, createSelector, createFeatureSelector } from '@ngrx/store'

export interface State {
  workingSlots: fromWorkingSlots.State;
  employers: fromEmployers.State;

}

export const reducers: ActionReducerMap<State> = {
  workingSlots: fromWorkingSlots.reducer,
  employers: fromEmployers.reducer
};


export const selectWorkingSlotsState = createFeatureSelector<fromWorkingSlots.State>('workingSlots');
export const getWorkingSlot = createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlot);
export const getWorkingSlotForDay = (date: Date) => createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlotForDay(date));
export const getWorkingSlotForMonth = (date: Date) => createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlotForMonth(date));

export const selectEmployersState = createFeatureSelector<fromEmployers.State>('employers');
export const getEmployers = createSelector(selectEmployersState, fromEmployers.getEmployers);
export const getEmployer = (id: string) => createSelector(selectEmployersState, fromEmployers.getEmployer(id));
