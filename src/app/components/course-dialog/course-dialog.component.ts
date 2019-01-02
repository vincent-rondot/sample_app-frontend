import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployerService } from '../../services/employer.service';
import { Employer } from '../../models/employer.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  employers: Employer[] = [];

  form: FormGroup;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private employerService: EmployerService,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data.date)
    this.date = data.date;
  }

  ngOnInit() {
    this.getEmployers();


    this.form = this.fb.group({
      date: [this.date, Validators.required],
      employer: [null, Validators.required],
      startTime: [],
      endTime: []
    });
  }

  getEmployers(): void {
    this.employerService.getEmployers()
      .subscribe(employers => this.employers = employers);
  }

  save() {
    if (this.form.invalid) {
      // TODO : do better...
      // Manage form validation
      // Ex: http://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example
      alert("Invalid")
    } else {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
