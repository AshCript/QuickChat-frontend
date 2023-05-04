import { createMessageService } from './message/createMessageService';
import { getAllUserMessageService } from './message/getAllUserMessageService';
import { getLastUserMessagesService } from './message/getLastUserMessages';

export class MessageService {
  static readonly path = 'http://localhost:3005/api';

  static async getAllUserMessage(token: string, idUser: number) {
    return getAllUserMessageService(this.path, token, idUser);
  }

  static async getLastUserMessages(token: string) {
    return getLastUserMessagesService(this.path, token);
  }

  static async createMessage(
    token: string,
    idReceiver: number,
    content: string
  ) {
    return createMessageService(this.path, token, idReceiver, content);
  }
}
