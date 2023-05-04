import axios, { AxiosResponse } from 'axios';

const path = 'http://localhost:3005/api';

export class RoomService {
  static async getAllRooms(token: string) {
    const res = await axios.get(`${path}/rooms`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return { message: res.data.message, data: res.data.data };
  }

  static async createRoom(
    token: string,
    data: { roomName: string; userId: number }
  ) {
    const res = await axios.post(
      `${path}/room`,
      {
        name: data.roomName,
        idUserTwo: data.userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { message: res.data.message, data: res.data.data };
  }
}
