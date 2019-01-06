import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatNativeDateModule, MatDatepickerModule,
  MatListModule,MatFormFieldModule, MatSelectModule
} from '@angular/material';



@NgModule({
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    // NgxMaterialTimepickerModule
  ],
  exports: [
   CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatNativeDateModule,
   MatDatepickerModule,
   MatListModule,
   MatFormFieldModule,
   MatSelectModule,
  //  AmazingTimePickerModule,
  //  NgxMaterialTimepickerModule

   ],
})
export class CustomMaterialModule { }