import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Rol from '../models/Rol';

import { environment } from '../../../../environments/environments';
const backend = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  roles = new BehaviorSubject<Rol[]>([]);

  constructor(private http: HttpClient) {
    http
      .get<Rol[]>(`${backend}/roles`)
      .subscribe((incRoles: Rol[]) => this.roles.next(incRoles));
  }

  getRoles() {
    return this.roles.asObservable();
  }
  nuevoRol(rol: any): Observable<Rol | undefined> {
    let newRol = new BehaviorSubject<Rol | undefined>(undefined);
    this.http
      .post<Rol>(`${backend}/roles`, { rol_nombre: rol })
      .subscribe((role: Rol) => {
        this.roles.next([...this.roles.value, role]);
        newRol.next(role);
      });
    return newRol.asObservable();
  }
}
