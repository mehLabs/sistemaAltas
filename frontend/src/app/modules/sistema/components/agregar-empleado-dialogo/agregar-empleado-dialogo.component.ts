import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import Rol from '../../models/Rol';
import Sector from '../../models/Sector';
import { EmpleadosService } from '../../services/empleados.service';
import { RolesService } from '../../services/roles.service';
import { SectoresService } from '../../services/sectores.service';

@Component({
  selector: 'app-agregar-empleado-dialogo',
  templateUrl: './agregar-empleado-dialogo.component.html',
  styleUrls: ['./agregar-empleado-dialogo.component.css'],
})
export class AgregarEmpleadoDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarEmpleadoDialogoComponent>,
    private backend: EmpleadosService,
    private rolService: RolesService,
    private sectoresService: SectoresService
  ) {}
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

  roleAndSector = new FormGroup({
    rol_id: new FormControl(),
    sector_id: new FormControl(),
  });

  salario = new FormGroup({
    salario: new FormControl(),
  });

  rol_id = { rol_id: null };
  sector_id = { sector_id: null };
  dir_id = { dir_id: null };

  ngSubmit() {
    this.backend.nuevoEmpleado(this.nuevoEmpleado.value);
    this.dialogRef.close();
  }

  setEmpleadoBasic(event: Event) {}
  setDomicilio(direccionId: any) {
    this.nuevoEmpleado.get('dir_id')?.setValue(direccionId);
  }
  setRolAndSector(e: Event) {
    e.preventDefault();
    const rol = this.rol.value;
    const sector = this.sector.value;
    if (rol?.rol_id && sector.sector_id) {
      this.nuevoEmpleado.get('rol_id')?.setValue(rol.rol_id);
      this.nuevoEmpleado.get('sector_id')?.setValue(sector.sector_id);
      const nextButton = document.getElementById('toStep4');
      nextButton?.click();
    } else {
      const waiting = new BehaviorSubject<any>({ rol: true, sector: true });

      if (!rol.rol_id) {
        this.rolService.nuevoRol(rol).subscribe((newRol: Rol | undefined) => {
          if (newRol) {
            this.nuevoEmpleado.get('rol_id')?.setValue(newRol.rol_id);
          }

          let waitObj = waiting.value;
          waitObj.rol = false;
          waiting.next(waitObj);
        });
      } else {
        let waitObj = waiting.value;
        waitObj.rol = false;
        waiting.next(waitObj);
      }
      if (!sector.sector_id) {
        this.sectoresService
          .nuevoSector(sector)
          .subscribe((newSector: Sector | undefined) => {
            if (newSector) {
              this.nuevoEmpleado
                .get('sector_id')
                ?.setValue(newSector.sector_id);
            }

            let waitObj = waiting.value;
            waitObj.sector = false;
            waiting.next(waitObj);
          });
      } else {
        let waitObj = waiting.value;
        waitObj.sector = false;
        waiting.next(waitObj);
      }
      waiting.asObservable().subscribe((waitObj) => {
        if (waitObj.rol === false && waitObj.sector === false) {
          const nextButton = document.getElementById('toStep4');
          nextButton?.click();
        }
      });
    }
  }

  setSalarioAndFinish() {
    const salario = this.salario.get('salario')?.value;
    this.nuevoEmpleado.get('salario')?.setValue(salario);
    this.ngSubmit();
  }
  rol = new FormControl<any | string>('');
  sector = new FormControl<any | string>('');

  startDate = new Date(1990, 0, 1);
}
