import axios from 'axios';

export async function getLastUserMessagesService(path: string, token: string) {
  const res = await axios.get(`${path}/messages/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return { message: res.data.message, data: res.data.data };
}
