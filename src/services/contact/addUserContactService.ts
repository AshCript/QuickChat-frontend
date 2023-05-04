import axios from 'axios';

export async function addUserContactService(
  path: string,
  token: string,
  idUser: number,
  idFriend: number
) {
  const res = await axios.post(
    `${path}/contact`,
    {
      idUser,
      idFriend,
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
