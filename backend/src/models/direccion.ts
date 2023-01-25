import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Ciudad from "./ciudad";

@Table
export default class Direccion extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  dir_id: number;

  @Column(DataType.INTEGER)
  cod_postal: number;

  @Column(DataType.STRING)
  direccion: string;
}
