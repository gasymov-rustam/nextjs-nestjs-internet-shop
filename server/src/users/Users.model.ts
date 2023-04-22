import { Column, Model, Table } from 'sequelize-typescript';

interface IUsers {
  username: string;
  email: string;
  password: string;
}

@Table
export class User extends Model<IUsers> {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
}
