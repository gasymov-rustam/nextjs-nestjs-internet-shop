import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './Users.model';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateResponse, IFilterUser, PromiseResponse } from './Users.type';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  findOne = (filter: { where: IFilterUser }): PromiseResponse<User> =>
    this.userModel.findOne(filter);

  create = async (user: CreateUserDto): CreateResponse<User> => {
    const createdUser = new User();

    const existingUserByUserName = await this.findOne({
      where: { username: user.username },
    });

    if (existingUserByUserName)
      return { warningMessage: 'User with this username already exists' };

    const existingUserByEmail = await this.findOne({
      where: { username: user.email },
    });

    if (existingUserByEmail)
      return { warningMessage: 'User with this email already exists' };

    const hashedPassword = await hash(user.password, 10);

    createdUser.username = user.username;
    createdUser.email = user.email;
    createdUser.password = hashedPassword;

    return createdUser.save();
  };
}
