import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import Ciudad from '../models/Ciudad';
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
}
