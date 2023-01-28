import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  HasMany,
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

  @HasMany(() => Direccion)
  direcciones: Direccion[];

  @Column({ type: DataType.INTEGER })
  cod_postal: number;

  @Column(DataType.STRING)
  ciudad_nombre: string;

  @Column(DataType.STRING)
  provincia_nombre: string;
}
