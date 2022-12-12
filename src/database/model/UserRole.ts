import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import User from './User';

interface UserRoleAttributes {
  id: number;
  role_name: string;
  role_description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRoleInput extends Optional<UserRoleAttributes, 'id'> {}
export interface UserRoleOutput extends Required<UserRoleAttributes> {}

class UserRole extends Model<UserRoleAttributes, UserRoleInput> implements UserRoleAttributes {
  id!: number;
  role_name!: string;
  role_description?: string | undefined;
  readonly createdAt?: Date | undefined;
  readonly updatedAt?: Date | undefined;
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'list_user_role',
  },
);

UserRole.belongsTo(User);

export default UserRole;
