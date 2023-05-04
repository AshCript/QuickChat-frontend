import axios from 'axios';

export async function addUserService(path: string, userData: any) {
  const res = await axios.post(`${path}/user`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { message: res.data.message, data: res.data.data };
}
