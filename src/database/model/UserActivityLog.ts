import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';
import User from './User';
import UserAction from './UserAction';

interface UserActivityLogAttributes {
  id: number;
  log_date: Date;
  user_id: number;
  action_id: number;
  description?: string;
  target_link?: string;
  target_value?: string;
  label?: string;
  metadata?: string;
}

export interface UserActivityLogInput extends Optional<UserActivityLogAttributes, 'id'> {}
export interface UserActivityLogOutput extends Required<UserActivityLogAttributes> {}

class UserActivityLog
  extends Model<UserActivityLogAttributes, UserActivityLogInput>
  implements UserActivityLogAttributes
{
  id!: number;
  log_date!: Date;
  user_id!: number;
  action_id!: number;
  description?: string | undefined;
  target_link?: string | undefined;
  target_value?: string | undefined;
  label?: string | undefined;
  metadata?: string | undefined;
}

UserActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    log_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    action_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    target_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    target_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    sequelize,
    tableName: 'list_user_activity_log',
  },
);

User.belongsToMany(UserAction, { through: UserActivityLog, foreignKey: 'user_id' });
UserAction.belongsToMany(User, { through: UserActivityLog, foreignKey: 'action_id' });

export default UserActivityLog;
