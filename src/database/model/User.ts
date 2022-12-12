import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import UserRole from './UserRole';
import UserStatus from './UserStatus';

interface UserAttributes {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phone?: string;
  last_active?: Date;
  role_id?: number;
  password: string;
  status_id?: number;
  photo_profile_path?: string;
  is_admin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'last_active'> {}
export interface UserOutput extends Omit<UserAttributes, 'password'> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  id!: number;
  username!: string;
  fullname!: string;
  email!: string;
  phone?: string | undefined;
  last_active?: Date | undefined;
  password!: string;
  photo_profile_path?: string | undefined;
  is_admin!: boolean;
  readonly createdAt: Date | undefined;
  readonly updatedAt?: Date | undefined;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_active: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo_profile_path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'list_user',
  },
);

UserRole.hasMany(User, { foreignKey: 'role_id' });
UserStatus.hasMany(User, { foreignKey: 'status_id' });

export default User;
