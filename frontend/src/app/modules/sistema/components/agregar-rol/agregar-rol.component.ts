import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import Rol from '../../models/Rol';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css'],
})
export class AgregarRolComponent implements OnInit {
  constructor(private backend: RolesService) {}
  roles: Rol[] = [];
  @Input() rol: FormControl = new FormControl<Rol | string | number>('');
  @Input() rol_id: number | undefined;
  rolesFiltrados!: Observable<Rol[]>;

  ngOnInit(): void {
    this.backend.getRoles().subscribe((roles: Rol[]) => {
      this.roles = roles;
      this.rolesFiltrados = this.rol.valueChanges.pipe(
        startWith(''),
        map((value) => (value.length >= 0 ? this._filterRol(value || '') : []))
      );
      if (this.rol_id) {
        const rolObj: Rol | undefined = this.roles.find(
          (rol) => rol.rol_id === this.rol_id
        );
        this._filterRol(rolObj?.rol_nombre || '');
        this.rol.setValue(rolObj);
      }
    });
  }

  private _filterRol(value: string): Rol[] {
    const filterValue = value.toLocaleLowerCase();
    return this.roles.filter((option) =>
      option.rol_nombre.toLocaleLowerCase().includes(filterValue)
    );
  }

  getRolNombre(rol: Rol) {
    return rol.rol_nombre;
  }
}
