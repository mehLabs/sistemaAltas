import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import Ciudad from '../models/Ciudad';
import Direccion from '../models/Direccion';
const backend = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class CiudadesService {
  ciudades = new BehaviorSubject<Ciudad[]>([]);

  constructor(private http: HttpClient) {}

  getProvincias(): Observable<any> {
    return this.http.get(`${backend}/ciudades/provincias`);
  }

  getCiudadesByProvincia(provincia: string): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(
      `${backend}/ciudades/provincia/${provincia}`
    );
  }

  nuevaDireccion(dir: any) {
    return this.http.post<Direccion>(`${backend}/direcciones`, dir);
  }

  nuevoRol(rol: any) {
    return this.http.post(`${backend}/roles`, rol);
  }

  eliminarRol(id: number) {
    return this.http.post(`${backend}/roles`, id);
  }

  nuevoSector(sector: any) {
    return this.http.post(`${backend}/sectores`, sector);
  }

  eliminarSector(id: number) {
    return this.http.post(`${backend}/sectores`, id);
  }
}
