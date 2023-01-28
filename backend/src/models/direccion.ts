import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Ciudad from "./ciudad";
import Empleado from "./empleado";

@Table
export default class Direccion extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  dir_id: number;

  @Column(DataType.INTEGER)
  cod_postal: number;

  @ForeignKey(() => Ciudad)
  @Column(DataType.INTEGER)
  id_ciudad: number;

  @BelongsTo(() => Ciudad)
  ciudad: Ciudad;

  @Column(DataType.STRING)
  direccion: string;

  @HasMany(() => Empleado)
  empleados: Empleado[];
}
