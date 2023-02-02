import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { SharedModule } from '../shared/shared.module';
import { AgregarEmpleadoDialogoComponent } from './components/agregar-empleado-dialogo/agregar-empleado-dialogo.component';
import { FormsModule } from '../forms/forms.module';
import { AgregarDomicilioComponent } from './components/agregar-domicilio/agregar-domicilio.component';
import { AgregarSectorComponent } from './components/agregar-sector/agregar-sector.component';
import { AgregarRolComponent } from './components/agregar-rol/agregar-rol.component';
import { ServerControlComponent } from './components/server-control/server-control.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    SistemaComponent,
    AgregarEmpleadoDialogoComponent,
    AgregarDomicilioComponent,
    AgregarSectorComponent,
    AgregarRolComponent,
    ServerControlComponent,
  ],
  imports: [
    FormsModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
    CommonModule,
    SistemaRoutingModule,
  ],
})
export class SistemaModule {}
