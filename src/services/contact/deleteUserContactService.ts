import axios from 'axios';

export async function deleteUserContactService(
  path: string,
  token: string,
  id: number
) {
  const res = await axios.delete(`${path}/contact/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return { message: res.data.message, data: res.data.data };
}
