import { addUserContactService } from './contact/addUserContactService';
import { deleteUserContactService } from './contact/deleteUserContactService';
import { getAllUserContactService } from './contact/getAllUserContactService';

export class ContactService {
  static readonly path = 'http://localhost:3005/api';

  static async getAllUserContact(token: string) {
    return getAllUserContactService(this.path, token);
  }

  static addUserContact(token: string, idUser: number, idFriend: number) {
    return addUserContactService(this.path, token, idUser, idFriend);
  }

  static async deleteUserContact(token: string, id: number) {
    return deleteUserContactService(this.path, token, id);
  }
}
