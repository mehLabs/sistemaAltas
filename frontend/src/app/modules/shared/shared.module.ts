import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, HttpClientModule],
  exports: [MatButtonModule, HttpClientModule],
})
export class SharedModule {}
