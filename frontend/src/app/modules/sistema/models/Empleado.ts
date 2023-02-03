import Direccion from './Direccion';
import Rol from './Rol';
import Sector from './Sector';

export default interface Empleado {
  em_id: number;

  genero: string;

  alta: boolean;

  dir_id: number;
  direccion: Direccion;

  descripcion: string;

  sector_id: number;
  sector: Sector;

  rol_id: number;
  rol: Rol;

  telefono: number;

  nombre: string;

  apellido: string;

  fecha_nacimiento: Date;

  salario: number;

  fecha_alta: Date;
}
