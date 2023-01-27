import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import sequelize from "./db/db";
import Direccion from "./direccion";

@Table
export default class Ciudad extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  id_ciudad: number;

  @Column({ type: DataType.INTEGER })
  cod_postal: number;

  @Column(DataType.STRING)
  ciudad_nombre: string;

  @Column(DataType.STRING)
  provincia_nombre: string;
}
