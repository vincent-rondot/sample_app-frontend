import { Pipe, PipeTransform } from '@angular/core';
import * as utils from './utils'
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
    transform(date: Date): string {
        return utils.dateFormat(date)
    }
}

@Pipe({ name: 'durationFormat' })
export class DurationFormatPipe implements PipeTransform {
    transform(duration: moment.Duration): string {
        return utils.durationFormat(duration)
    }
}

@Pipe({ name: 'escapeNewLine' })
export class EscapeNewLinePipe implements PipeTransform {
  transform(s: string): string {
    // return s.replace(new RegExp('\n', 'g'), '%0D%0A')
    return s.replace(new RegExp('\n', 'g'), '%0D%0A')

    
  }
}
