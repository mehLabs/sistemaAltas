import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Empleado from '../models/Empleado';
import { environment } from '../../../../environments/environments';
const backend = environment.apiUrl;

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
  nuevoEmpleado(empleado: any) {
    this.http
      .post<Empleado>(`${backend}/empleados`, empleado)
      .subscribe((emp) => {
        this.getEmpleadoById(emp.em_id).subscribe((newEmp) => {
          this.empleados.next([...this.empleados.value, newEmp]);
        });
      });
  }

  getEmpleadoById(id: number) {
    return this.http.get<Empleado>(`${backend}/empleados/id/${id}`);
  }
}
