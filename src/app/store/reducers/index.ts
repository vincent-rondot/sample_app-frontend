import { ActionReducerMap } from '@ngrx/store'
import * as fromWorkingSlots from './tutorial.reducer';
import { Action, createSelector, createFeatureSelector } from '@ngrx/store'

export interface State {
  workingSlots: fromWorkingSlots.State;
}

export const reducers: ActionReducerMap<State> = {
  workingSlots: fromWorkingSlots.reducer
};


export const selectWorkingSlotsState = createFeatureSelector<fromWorkingSlots.State>('workingSlots');
export const getWorkingSlot = createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlot)
export const getWorkingSlotForDay = (date: Date) => createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlotForDay(date))
export const getWorkingSlotForMonth = (date: Date) => createSelector(selectWorkingSlotsState, fromWorkingSlots.getWorkingSlotForMonth(date))

