import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agregar-empleado-dialogo',
  templateUrl: './agregar-empleado-dialogo.component.html',
  styleUrls: ['./agregar-empleado-dialogo.component.css'],
})
export class AgregarEmpleadoDialogoComponent {
  nuevoEmpleado = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    genero: new FormControl(),
    dir_id: new FormControl(),
    sector_id: new FormControl(),
    rol_id: new FormControl(),
    telefono: new FormControl(),
    fecha_nacimiento: new FormControl(),
    salario: new FormControl(),
    fecha_alta: new FormControl(new Date()),
  });

  startDate = new Date(1990, 0, 1);
}