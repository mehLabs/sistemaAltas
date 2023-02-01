import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import Sector from '../models/Sector';
const backend = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SectoresService {
  sectores = new BehaviorSubject<Sector[]>([]);

  constructor(private http: HttpClient) {
    http
      .get<Sector[]>(`${backend}/sectores`)
      .subscribe((incRoles: Sector[]) => this.sectores.next(incRoles));
  }

  getSectores() {
    return this.sectores.asObservable();
  }
  nuevoSector(sector: any): Observable<Sector | undefined> {
    let newSector = new BehaviorSubject<Sector | undefined>(undefined);
    this.http
      .post<Sector>(`${backend}/sectores`, { sector_nombre: sector })
      .subscribe((sectore) => {
        this.sectores.next([...this.sectores.value, sectore]);
        newSector.next(sectore);
      });
    return newSector.asObservable();
  }
}
