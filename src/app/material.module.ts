import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatNativeDateModule, MatDatepickerModule,
  MatListModule,MatFormFieldModule, MatSelectModule
} from '@angular/material';

import {MatExpansionModule} from '@angular/material/expansion';


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
    MatExpansionModule
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
   MatExpansionModule

   ],
})
export class CustomMaterialModule { }