import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Employer } from './../models/employer.model'

const EMPLOYERS: Employer[] = [
  // { id: '1', email: "vincent.rondot@gmail.com", name: 'Vincent Rondot' },
  // { id: '2', email: "dh.sarah.r@gmail.com", name: "Sarah d'Hardiville" },
  // { id: '3', email: "xxx@gmail.com", name: "Other..." },
];



@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor() { }


  getEmployers(): Observable<Employer[]> {
    return of(EMPLOYERS);
  }

  getEmployer(employerId: string): Observable<Employer> {
    return of(EMPLOYERS.filter(e => e.id = employerId)[0]);
  }
}
