import { Action, createSelector, createFeatureSelector } from '@ngrx/store'
import { WorkingSlot } from '.././../models/workingslot.model'
import * as TutorialActions from './../actions/tutorial.actions'
import { selectWorkingSlotsState } from './index'


export interface State {
    readonly workingSlots: WorkingSlot[];
}

export const initialState: State = {
    workingSlots: [],
};

// Section 2
export function reducer(state: State = initialState, action: TutorialActions.Actions) {

    // Section 3
    switch (action.type) {
        case TutorialActions.ADD_WORKINGSLOT:
            return { workingSlots: [...state.workingSlots, action.payload] };
        case TutorialActions.REMOVE_WORKINGSLOT:
            return { workingSlots: state.workingSlots.filter(workingSlot => workingSlot.id != action.payload) };
        case TutorialActions.UPDATE_WORKINGSLOT:
            return {
                workingSlots: state.workingSlots.map(workingSlot => {
                    if (workingSlot.id === action.payload.id) {
                        return Object.assign({}, action.payload);
                    }
                    else return workingSlot;
                })
            };

        default:
            console.log("unknown action")
            return state;
    }
}


export const getWorkingSlot =
    (state: State) => {
        return state.workingSlots
    }



// Selector are here
// export const selectState = createFeatureSelector<State>('workingSlots');

export const getWorkingSlotForDay = (date: Date) =>
    // selectWorkingSlotsState,
    // (state: WorkingSlot[]) => {
    //     return state.filter(x => sameDay(x.date, date))
    // }
    (state: State) => {
        return state.workingSlots.filter(x => {
            console.log(x)
            return sameDay(x.date, date)
        })
    }


export const getWorkingSlotForMonth = (date: Date) =>
    // selectWorkingSlotsState,
    // (state: WorkingSlot[]) => {
    //     console.log("getWorkingSlotForMonth")
    //     return state.filter(x => sameMonth(x.date, date))
    // }
    (state: State) => {
        console.log("getWorkingSlotForMonth: ", state.workingSlots)
        return state.workingSlots.filter(x => sameMonth(x.date, date))
    }


export function sameDay(d1, d2) {
    console.log("sameDay ?:", d1, d2)
    let res = d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    console.log("compare sameDay: ", d1, "/", d2, ">", res)

    return res
}

export function sameMonth(d1, d2) {
    console.log("sameMonth ?:", d1, d2)
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth();
}