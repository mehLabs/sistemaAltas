import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table
export default class Sector extends Model {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  sector_id: number;

  @Column(DataType.STRING)
  sector_nombre: string;
}
