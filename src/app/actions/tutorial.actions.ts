// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { WorkingSlot } from './../models/workingslot.model'

// Section 2
export const ADD_WORKINGSLOT       = '[WORKINGSLOT ] Add'
export const REMOVE_WORKINGSLOT    = '[WORKINGSLOT ] Remove'

// Section 3
export class AddWorkingSlot implements Action {
    readonly type = ADD_WORKINGSLOT 

    constructor(public payload: WorkingSlot) {}
}

export class RemoveWorkingSlot implements Action {
    readonly type = REMOVE_WORKINGSLOT

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddWorkingSlot | RemoveWorkingSlot