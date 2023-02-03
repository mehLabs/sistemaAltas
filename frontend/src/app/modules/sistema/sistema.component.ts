import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Empleado from './models/Empleado';
import { EmpleadosService } from './services/empleados.service';
import { AgregarEmpleadoDialogoComponent } from './components/agregar-empleado-dialogo/agregar-empleado-dialogo.component';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
})
export class SistemaComponent implements OnInit {
  empleadosArray: Empleado[] = [];
  columnasAMostrar = [
    'nombre',
    'apellido',
    'telefono',
    'genero',
    'rol',
    'sector',
    'edad',
    'direccion',
    'salario',
    'fecha_alta',
    'descripcion',
    'options',
  ];
  constructor(private empleados: EmpleadosService, public dialog: MatDialog) {}

  abrirDialog(): void {
    const dialogRef = this.dialog.open(AgregarEmpleadoDialogoComponent);
  }
  ngOnInit(): void {
    this.empleados.getEmpleados().subscribe((empleados) => {
      this.empleadosArray = empleados;
      console.log(empleados);
    });
  }

  delete(empleado: Empleado) {
    this.empleados.eliminarEmpleado(empleado);
  }
  edit(empleado: Empleado) {
    const dialogRef = this.dialog.open(AgregarEmpleadoDialogoComponent, {
      data: { empleado },
    });
  }

  genero(gen: string) {
    switch (gen) {
      case 'm':
        return 'Mujer';
      case 'h':
        return 'Hombre';
      default:
        return 'No binario';
    }
  }

  edad(fecha: Date) {
    return Math.floor(
      (new Date().valueOf() - new Date(fecha).valueOf()) /
        (1000 * 60 * 60 * 24 * 365)
    );
  }
}
