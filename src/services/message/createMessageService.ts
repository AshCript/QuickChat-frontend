import axios from 'axios';

export async function createMessageService(
  path: string,
  token: string,
  idReceiver: number,
  content: string
) {
  const res = await axios.post(
    `${path}/message`,
    {
      idReceiver,
      content,
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
