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
  @Input() sector_id: number | undefined;
  sectoresFiltrados!: Observable<Sector[]>;

  ngOnInit(): void {
    this.backend.getSectores().subscribe((sectores) => {
      this.sectoresFiltrados = this.sector.valueChanges.pipe(
        startWith(''),
        map((value) =>
          value.length >= 0 ? this._filterSector(value || '') : []
        )
      );
      this.sectores = sectores;
      if (this.sector_id) {
        console.log(this.sector_id);
        const sectorIn = sectores.find(
          (sector) => sector.sector_id === this.sector_id
        );
        console.log(sectorIn);
        this._filterSector(sectorIn?.sector_nombre || '');
        this.sector.setValue(sectorIn);
      }
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
