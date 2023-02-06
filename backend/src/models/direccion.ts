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
  declare dir_id: number;

  @Column(DataType.INTEGER)
  declare cod_postal: number;

  @ForeignKey(() => Ciudad)
  @Column(DataType.INTEGER)
  declare id_ciudad: number;

  @BelongsTo(() => Ciudad)
  declare ciudad: Ciudad;

  @Column(DataType.STRING)
  declare direccion: string;

  @HasMany(() => Empleado)
  empleados: Empleado[];
}
