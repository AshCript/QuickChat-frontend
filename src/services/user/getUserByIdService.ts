import axios from 'axios';

const path = 'http://localhost:3005/api';

export async function getUserByIdService(path: string, id: number) {
  const res = await axios.get(`${path}/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return {
    message: res.data.message,
    data: res.data.data,
  };
}
