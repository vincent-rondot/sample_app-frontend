import { Action, createSelector, createFeatureSelector } from '@ngrx/store'
import { WorkingSlot } from './../models/workingslot.model'
import * as TutorialActions from './../actions/tutorial.actions'


// Section 2
export function reducer(state: WorkingSlot[] = [], action: TutorialActions.Actions) {

    // Section 3
    switch (action.type) {
        case TutorialActions.ADD_WORKINGSLOT:
            return [...state, action.payload];
        case TutorialActions.REMOVE_WORKINGSLOT:
            state.splice(action.payload, 1)
            return state;
        default:
            console.log("unknown action")
            return state;
    }
}




// Selector are here
export const getWorkingDays = state => state.workingSlots;
export const getState = createFeatureSelector<WorkingSlot>('workingSlots');

export const getWorkingSlotForDay = (date: Date) => createSelector(
    getWorkingDays,
    (getWorkingDays: WorkingSlot[]) => {
        //   if (getWorkingDays ) {
        //     return allBooks.filter((book: Book) => book.userId === selectedUser.id);
        //   } else {
        //     return allBooks;
        //   }
        return getWorkingDays.filter(x => sameDay(x.date, date))
    }
);

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}