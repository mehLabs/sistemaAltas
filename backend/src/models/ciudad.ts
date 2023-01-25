import {
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
  @Column({ primaryKey: true, type: DataType.INTEGER })
  cod_postal: number;

  @Column(DataType.STRING)
  ciudad_nombre: string;

  @Column(DataType.STRING)
  provincia_nombre: string;
}
