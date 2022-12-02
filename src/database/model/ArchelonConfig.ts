import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '..';

interface ArchelonConfigAttributes {
  config_id: number;
  api_key: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArchelonConfigInput extends Optional<ArchelonConfigAttributes, 'config_id'> {}
export interface ArchelonConfigOutput extends Required<ArchelonConfigAttributes> {}

class ArchelonConfig
  extends Model<ArchelonConfigAttributes, ArchelonConfigInput>
  implements ArchelonConfigAttributes
{
  public config_id!: number;
  public api_key!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ArchelonConfig.init(
  {
    config_id: {
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
    sequelize: sequelizeConnection,
  },
);

export default ArchelonConfig;
