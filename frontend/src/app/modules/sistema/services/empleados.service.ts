import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Empleado from '../models/Empleado';

const backend = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  empleados: BehaviorSubject<Empleado[]> = new BehaviorSubject<Empleado[]>([]);

  constructor(private http: HttpClient) {
    http
      .get(`${backend}/empleados`)
      .subscribe((empleados: any) => this.empleados.next(empleados));
  }

  getEmpleados() {
    return this.empleados.asObservable();
  }
}
