import axios from 'axios';
import { addUserService } from './user/addUserService';
import { getAllUsersService } from './user/getAllUsersService';
import { getUserByIdService } from './user/getUserByIdService';
import { getUserByLoginService } from './user/getUserByLoginService';

export class UserService {
  static readonly path = 'http://localhost:3005/api';

  static async getUserByLogin(login: string, password: string) {
    return await getUserByLoginService(this.path, login, password);
  }

  static async getAllUsers(token: string) {
    return await getAllUsersService(this.path, token);
  }

  static async getUserById(id: number) {
    return await getUserByIdService(this.path, id);
  }

  static async addUser(userData: any) {
    return await addUserService(this.path, userData);
  }
}
