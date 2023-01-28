import { Component, OnInit } from '@angular/core';
import Empleado from './models/Empleado';
import { EmpleadosService } from './services/empleados.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css'],
})
export class SistemaComponent implements OnInit {
  empleadosArray: Empleado[] = [];
  constructor(private empleados: EmpleadosService) {}
  ngOnInit(): void {
    this.empleados
      .getEmpleados()
      .subscribe((empleados) => (this.empleadosArray = empleados));
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
