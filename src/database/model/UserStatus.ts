import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface UserStatusAttributes {
  id: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStatusInput extends Optional<UserStatusAttributes, 'id'> {}
export interface UserStatusOuptut extends Required<UserStatusAttributes> {}

class UserStatus
  extends Model<UserStatusAttributes, UserStatusInput>
  implements UserStatusAttributes
{
  id!: number;
  status!: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

UserStatus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'list_user_status',
  },
);

export default UserStatus;
