import * as moment from 'moment';


export function dateFormat(date:Date):string  {
    console.log(date)
    return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}



export function durationFormat(duration:moment.Duration):string  {
    return Math.trunc(duration.asHours()) + 'h:' + duration.minutes() + 'min';
}