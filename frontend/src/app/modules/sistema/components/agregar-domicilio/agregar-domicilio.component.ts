import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import Ciudad from '../../models/Ciudad';
import { CiudadesService } from '../../services/ciudades.service';

@Component({
  selector: 'app-agregar-domicilio',
  templateUrl: './agregar-domicilio.component.html',
  styleUrls: ['./agregar-domicilio.component.css'],
})
export class AgregarDomicilioComponent implements OnInit {
  @Input() dir_id: any = null;

  constructor(private backend: CiudadesService) {}
  provincias: string[] = ['Buenos Aires', 'Río Negro'];
  ciudades: Ciudad[] = [];
  nuevoDomicilio = new FormGroup({
    cod_postal: new FormControl(),
    id_ciudad: new FormControl(),
    direccion: new FormControl(),
  });

  provinciasFiltradas!: Observable<string[]>;
  ciudadesFiltradas!: Observable<Ciudad[]>;

  ngOnInit() {
    this.backend.getProvincias().subscribe((provincias) => {
      this.provincias = provincias
        .map((provincia: any) => provincia.provincia_nombre)
        .filter((prov: string) => prov.length > 0);
      this.provinciasFiltradas = this.provincia.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterProv(value || ''))
      );
    });

    this.provincia.valueChanges.subscribe((input) => {
      this.provincias.includes(input)
        ? this.ciudad.enable()
        : this.ciudad.disable();
      this.backend
        .getCiudadesByProvincia(input)
        .subscribe((ciudades: Ciudad[]) => {
          this.ciudades = ciudades;

          this.ciudadesFiltradas = this.ciudad.valueChanges.pipe(
            startWith(''),
            map((value) =>
              value.length > 2 ? this._filterCiudad(value || '') : []
            )
          );
        });
    });
  }

  private _filterProv(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.provincias.filter((option) =>
      option.toLocaleLowerCase().includes(filterValue)
    );
  }
  private _filterCiudad(value: string): Ciudad[] {
    const filterValue = value.toLocaleLowerCase();
    return this.ciudades.filter((option) =>
      option.ciudad_nombre.toLocaleLowerCase().includes(filterValue)
    );
  }

  getCiudadNombre(ciudad: Ciudad) {
    return ciudad.ciudad_nombre;
  }

  nuevaDireccion(e: Event) {
    e.preventDefault();
    this.backend.console.log(this.nuevoDomicilio.value);
  }

  provincia: FormControl = new FormControl();
  ciudad: FormControl = new FormControl({ value: '', disabled: true });
}
