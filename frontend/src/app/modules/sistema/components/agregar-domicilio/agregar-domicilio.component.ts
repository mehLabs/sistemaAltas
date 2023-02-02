import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import Ciudad from '../../models/Ciudad';
import Direccion from '../../models/Direccion';
import { CiudadesService } from '../../services/ciudades.service';

@Component({
  selector: 'app-agregar-domicilio',
  templateUrl: './agregar-domicilio.component.html',
  styleUrls: ['./agregar-domicilio.component.css'],
})
export class AgregarDomicilioComponent implements OnInit {
  @Output() domicilio = new EventEmitter<number>();

  constructor(private backend: CiudadesService) {}
  provincias: string[] = ['Buenos Aires', 'Río Negro'];
  ciudades: Ciudad[] = [];
  nuevoDomicilio = new FormGroup({
    cod_postal: new FormControl<number | null>(null, [Validators.required]),
    id_ciudad: new FormControl<number | null>(null, [Validators.required]),
    direccion: new FormControl<string | null>(null, [Validators.required]),
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
    const selectedCod_pos = this.ciudad.value.cod_postal;
    const selectedId_ciudad = this.ciudad.value.id_ciudad;

    this.nuevoDomicilio.get('cod_postal')?.setValue(selectedCod_pos);
    this.nuevoDomicilio.get('id_ciudad')?.setValue(selectedId_ciudad);

    this.backend
      .nuevaDireccion(this.nuevoDomicilio.value)
      .subscribe((domicilio: Direccion) => {
        this.domicilio.emit(domicilio.dir_id);
        const next = document.getElementById('toStep3');
        next?.click();
      });
  }

  provincia: FormControl = new FormControl();
  ciudad: FormControl = new FormControl({ value: '', disabled: true });
}
