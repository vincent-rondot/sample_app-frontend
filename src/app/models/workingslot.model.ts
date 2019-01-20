import { Employer } from './employer.model'
import * as moment from 'moment';


export interface WorkingSlot {
    id: string;
    date: Date;
    employer:Employer;
    startTime: string;
    endTime: string;

    date2: moment.Moment,
    duration: moment.Duration;

    // fromDate: Date;
    // toDate: Date;

}


export interface MonthlyReport {
    month: Date;
    employerId: string;
}

export interface DailyReport {
    day: Date;
    employerId: string;
    workingSlots: WorkingSlot[];
}