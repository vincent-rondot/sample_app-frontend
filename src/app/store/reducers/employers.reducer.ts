import { Action, createSelector, createFeatureSelector } from '@ngrx/store'
import { WorkingSlot } from '../../models/workingslot.model'
import { Employer } from '../../models/employer.model'

import * as TutorialActions from '../actions/tutorial.actions'
import { selectWorkingSlotsState } from './index'


export interface State {
    readonly employers: Employer[];
}

export const initialState: State = {
    employers: [
        { id: '1', email: "vincent.rondot@gmail.com", name: 'Vincent Rondot' },
        { id: '2', email: "dh.sarah.r@gmail.com", name: "Sarah d'Hardiville" },
        { id: '3', email: "xxx@gmail.com", name: "Other..." },
    ],
};


// Section 2
export function reducer(state: State = initialState, action: TutorialActions.Actions) {

    // Section 3
    switch (action.type) {
        // case TutorialActions.ADD_WORKINGSLOT:
        //     return { workingSlots: [...state.workingSlots, action.payload] };
        // case TutorialActions.REMOVE_WORKINGSLOT:
        //     return { workingSlots: state.workingSlots.filter(workingSlot => workingSlot.id != action.payload) };
        // case TutorialActions.UPDATE_WORKINGSLOT:
        //     return {
        //         workingSlots: state.workingSlots.map(workingSlot => {
        //             if (workingSlot.id === action.payload.id) {
        //                 return Object.assign({}, action.payload);
        //             }
        //             else return workingSlot;
        //         })
        //     };

        default:
            console.log("unknown action")
            return state;
    }
}

export const getEmployers =
    (state: State) => {
        return state.employers
    }


export const getEmployer = (id: string) => createSelector(
    getEmployers,
    (employers) => {
       return employers.find(e => e.id == id)
    }
)
