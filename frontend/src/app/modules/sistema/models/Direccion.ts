import Ciudad from './Ciudad';
import Empleado from './Empleado';

export default interface Direccion {
  dir_id: number;
  cod_postal: number;
  id_ciudad: number;
  ciudad: Ciudad;
  direccion: string;
  empleados?: Empleado[];
}
