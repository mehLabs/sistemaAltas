import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [],
  imports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class FormsModule {}
