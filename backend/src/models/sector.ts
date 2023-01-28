import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Empleado from "./empleado";

@Table
export default class Sector extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  sector_id: number;

  @Column(DataType.STRING)
  sector_nombre: string;

  @HasMany(() => Empleado)
  empleados: Empleado[];
}
