import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export default class Rol extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  rol_id: number;

  @Column(DataType.STRING)
  rol_nombre: string;
}
