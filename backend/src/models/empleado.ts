import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Direccion from "./direccion";
import Rol from "./rol";
import Sector from "./sector";

@Table
export default class Empleado extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  em_id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  genero: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  alta: boolean;

  @ForeignKey(() => Direccion)
  @Column({ allowNull: false, type: DataType.INTEGER })
  dir_id: number;

  @ForeignKey(() => Sector)
  @Column({ allowNull: false, type: DataType.INTEGER })
  sector_id: number;

  @ForeignKey(() => Rol)
  @Column({ allowNull: false, type: DataType.INTEGER })
  rol_id: number;

  @Column({ allowNull: false, type: DataType.BIGINT })
  telefono: number;

  @Column({ allowNull: false, type: DataType.STRING })
  nombre: string;

  @Column({ allowNull: false, type: DataType.STRING })
  apellido: string;

  @Column({ allowNull: false, type: DataType.DATE })
  fecha_nacimiento: Date;

  @Column({ allowNull: false, type: DataType.INTEGER })
  salario: number;

  @Column({ allowNull: false, type: DataType.DATE })
  fecha_alta: Date;
}
