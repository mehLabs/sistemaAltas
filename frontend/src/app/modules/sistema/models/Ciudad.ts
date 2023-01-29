import Direccion from './Direccion';

export default interface Ciudad {
  id_ciudad: number;
  direcciones?: Direccion[];
  cod_postal: number;
  ciudad_nombre: string;
  provincia_nombre: string;
}
