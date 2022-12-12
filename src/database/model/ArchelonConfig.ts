import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface ArchelonConfigAttributes {
  id: number;
  api_key: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArchelonConfigInput extends Optional<ArchelonConfigAttributes, 'id'> {}
export interface ArchelonConfigOutput extends Required<ArchelonConfigAttributes> {}

class ArchelonConfig
  extends Model<ArchelonConfigAttributes, ArchelonConfigInput>
  implements ArchelonConfigAttributes
{
  public id!: number;
  public api_key!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ArchelonConfig.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'archelon_config',
  },
);

export default ArchelonConfig;
