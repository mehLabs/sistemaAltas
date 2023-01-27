export default interface Empleado {
  em_id: number;

  genero: string;

  alta: boolean;

  dir_id: number;

  sector_id: number;

  telefono: number;

  nombre: string;

  apellido: string;

  fecha_nacimiento: Date;

  salario: number;

  fecha_alta: Date;
}
