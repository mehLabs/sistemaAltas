import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import Empleado from '../../models/Empleado';
import Rol from '../../models/Rol';
import Sector from '../../models/Sector';
import { EmpleadosService } from '../../services/empleados.service';
import { RolesService } from '../../services/roles.service';
import { SectoresService } from '../../services/sectores.service';

interface DataEmpleado {
  empleado: Empleado;
}
@Component({
  selector: 'app-agregar-empleado-dialogo',
  templateUrl: './agregar-empleado-dialogo.component.html',
  styleUrls: ['./agregar-empleado-dialogo.component.css'],
})
export class AgregarEmpleadoDialogoComponent {
  edit: boolean = false;
  em_id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarEmpleadoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataEmpleado,
    private backend: EmpleadosService,
    private rolService: RolesService,
    private sectoresService: SectoresService
  ) {
    if (data) {
      this.edit = true;
      const {
        em_id,
        nombre,
        apellido,
        genero,
        dir_id,
        sector_id,
        rol_id,
        telefono,
        fecha_nacimiento,
        salario,
        fecha_alta,
        descripcion,
      } = data.empleado;
      this.nuevoEmpleado.setValue({
        nombre,
        apellido,
        genero,
        dir_id,
        sector_id,
        rol_id,
        telefono,
        fecha_nacimiento,
        salario,
        fecha_alta,
        descripcion,
      });
      this.sector_id.sector_id = sector_id;
      this.dir_id.dir_id = dir_id;
      this.rol_id.rol_id = rol_id;
      this.em_id = em_id;

      this.salario.setValue({
        salario: salario,
        descripcion: descripcion,
      });
    }
  }
  nuevoEmpleado = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    genero: new FormControl<string | null>(null, [Validators.required]),
    dir_id: new FormControl<number | null>(null, [Validators.required]),
    sector_id: new FormControl<number | null>(null, [Validators.required]),
    rol_id: new FormControl<number | null>(null, [Validators.required]),
    telefono: new FormControl<number | null>(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    fecha_nacimiento: new FormControl<any>(null, [Validators.required]),
    salario: new FormControl<number | null>(null, [
      Validators.required,
      Validators.max(1000000000),
    ]),
    fecha_alta: new FormControl(new Date()),
    descripcion: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  roleAndSector = new FormGroup({
    rol_id: new FormControl<number | null>(null, [Validators.required]),
    sector_id: new FormControl<number | null>(null, [Validators.required]),
  });

  salario = new FormGroup({
    salario: new FormControl<number | null>(null, [Validators.required]),
    descripcion: new FormControl<string | null>(null, [
      Validators.minLength(6),
    ]),
  });

  rol_id: any = { rol_id: null };
  sector_id: any = { sector_id: null };
  dir_id: any = { dir_id: null };

  ngSubmit() {
    if (this.nuevoEmpleado.valid) {
      if (!this.edit) {
        this.backend.nuevoEmpleado(this.nuevoEmpleado.value);
      } else {
        this.backend.editarEmpleado(this.nuevoEmpleado.value, this.em_id || 0);
      }
      this.dialogRef.close();
    } else {
      console.error(this.nuevoEmpleado.value);
      alert('Faltan campos!!!');
    }
  }

  setEmpleadoBasic(event: Event) {
    if (
      this.nuevoEmpleado.get('nombre')?.valid &&
      this.nuevoEmpleado.get('apellido')?.valid &&
      this.nuevoEmpleado.get('genero')?.valid &&
      this.nuevoEmpleado.get('telefono')?.valid &&
      this.nuevoEmpleado.get('fecha_nacimiento')?.valid
    ) {
      const nextButton = document.getElementById('toStep2');
      nextButton?.click();
    }
  }
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
    if (this.salario.valid) {
      const salario: number = this.salario.get('salario')?.value || 0;
      this.nuevoEmpleado.get('salario')?.setValue(salario);

      const descripcion: string =
        this.salario.get('descripcion')?.value || 'No posee';
      this.nuevoEmpleado.get('descripcion')?.setValue(descripcion);

      this.ngSubmit();
    }
  }
  rol = new FormControl<any | string>('');
  sector = new FormControl<any | string>('');

  startDate = new Date(1990, 0, 1);
}
