import { api } from "./api";

export const LoginAPI = async (email, password) => {
  try {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return data === 'incorrect' && 'error'
  } catch (error) {
    console.error('Cannot Login', error)
  }
}