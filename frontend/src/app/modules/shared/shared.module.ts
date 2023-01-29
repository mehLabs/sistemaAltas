import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [MatIconModule, CommonModule, MatButtonModule, HttpClientModule],
  exports: [MatIconModule, MatButtonModule, HttpClientModule],
})
export class SharedModule {}
