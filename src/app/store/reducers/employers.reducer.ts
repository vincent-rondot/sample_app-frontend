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
        { id: '2', email: "dh.sarah.r@gmail.com", name: "Julien", defaultStartTime: "08:30" },
        { id: '3', email: "dh.sarah.r@gmail.com", name: "Marie-Aude", defaultStartTime: "08:00" },
        // { id: '1', email: "vincent.rondot@gmail.com", name: 'Vincent Rondot', defaultStartTime: "12:30" },

    ],
};


// Section 2
export function reducer(state: State = initialState) {

    // Section 3
    // switch (action.type) {
    //     // case TutorialActions.ADD_WORKINGSLOT:
    //     //     return { workingSlots: [...state.workingSlots, action.payload] };
    //     // case TutorialActions.REMOVE_WORKINGSLOT:
    //     //     return { workingSlots: state.workingSlots.filter(workingSlot => workingSlot.id != action.payload) };
    //     // case TutorialActions.UPDATE_WORKINGSLOT:
    //     //     return {
    //     //         workingSlots: state.workingSlots.map(workingSlot => {
    //     //             if (workingSlot.id === action.payload.id) {
    //     //                 return Object.assign({}, action.payload);
    //     //             }
    //     //             else return workingSlot;
    //     //         })
    //     //     };

    //     default:
    //         console.log("unknown action")
    //         return state;
    // }

    return state;
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
