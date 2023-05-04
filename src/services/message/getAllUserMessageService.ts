import axios from 'axios';

export async function getAllUserMessageService(
  path: string,
  token: string,
  idUser: number
) {
  const res = await axios.get(`${path}/messages/${idUser}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return { message: res.data.message, data: res.data.data };
}
