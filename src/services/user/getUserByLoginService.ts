import axios from 'axios';

const path = 'http://localhost:3005/api';

export async function getUserByLoginService(
  path: string,
  login: string,
  password: string
) {
  const res = await axios.post(
    `${path}/login`,
    {
      login,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return {
    message: res.data.message,
    data: res.data.data,
    token: res.data.token,
  };
}
