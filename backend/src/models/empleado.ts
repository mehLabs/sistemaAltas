import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Direccion from "./direccion";
import Rol from "./rol";
import Sector from "./sector";

@Table
export default class Empleado extends Model {
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  declare em_id: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare genero: string;

  @Column({ defaultValue: true, type: DataType.BOOLEAN })
  declare alta: boolean;

  @ForeignKey(() => Direccion)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare dir_id: number;

  @BelongsTo(() => Direccion)
  direccion: Direccion;

  @ForeignKey(() => Sector)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare sector_id: number;

  @BelongsTo(() => Sector)
  sector: Sector;

  @ForeignKey(() => Rol)
  @Column({ allowNull: false, type: DataType.INTEGER })
  declare rol_id: number;

  @BelongsTo(() => Rol)
  rol: Rol;

  @Column({ allowNull: false, type: DataType.BIGINT })
  declare telefono: number;

  @Column({ allowNull: false, type: DataType.STRING })
  declare nombre: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare apellido: string;

  @Column({ allowNull: false, type: DataType.DATE })
  declare fecha_nacimiento: Date;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare salario: number;

  @Column({ allowNull: false, type: DataType.DATE })
  declare fecha_alta: Date;

  @Column({ defaultValue: "No tiene", type: DataType.TEXT() })
  declare descripcion: string;
}
