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
export default class Rol extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  rol_id: number;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  rol_nombre: string;

  @HasMany(() => Empleado)
  empleados: Empleado[];
}
