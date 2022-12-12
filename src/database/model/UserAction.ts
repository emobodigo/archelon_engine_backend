import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface UserActionAttributes {
  id: number;
  action_name: string;
  action_code: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserActionInput extends Optional<UserActionAttributes, 'id'> {}
export interface UserActionOutput extends Required<UserActionAttributes> {}

class UserAction
  extends Model<UserActionAttributes, UserActionInput>
  implements UserActionAttributes
{
  id!: number;
  action_name!: string;
  action_code!: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

UserAction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    action_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
    tableName: 'list_user_action',
  },
);

export default UserAction;
