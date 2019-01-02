import { Employer } from './employer.model'
import * as moment from 'moment';


export interface WorkingSlot {
    date: Date;
    employer:Employer;
    startTime: string;
    endTime: string;

    date2: moment.Moment,
    duration: moment.Duration;

    // fromDate: Date;
    // toDate: Date;

}