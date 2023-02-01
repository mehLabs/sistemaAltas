import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import Sector from '../../models/Sector';
import { SectoresService } from '../../services/sectores.service';

@Component({
  selector: 'app-agregar-sector',
  templateUrl: './agregar-sector.component.html',
  styleUrls: ['./agregar-sector.component.css'],
})
export class AgregarSectorComponent {
  constructor(private backend: SectoresService) {}
  sectores: Sector[] = [];
  @Input() sector: FormControl = new FormControl<Sector | string>('');
  sectoresFiltrados!: Observable<Sector[]>;

  ngOnInit(): void {
    this.backend.getSectores().subscribe((sectores) => {
      this.sectoresFiltrados = this.sector.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterSector(value || ''))
      );
      this.sectores = sectores;
    });
  }

  private _filterSector(value: string): Sector[] {
    const filterValue = value.toLocaleLowerCase();
    return this.sectores.filter((option) =>
      option.sector_nombre.toLocaleLowerCase().includes(filterValue)
    );
  }

  getSectorNombre(sector: Sector) {
    return sector.sector_nombre;
  }
}
