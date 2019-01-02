import { WorkingSlot } from './models/workingslot.model';

export interface AppState {
  readonly workingSlots: WorkingSlot[];
}