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

export const SignUpAPI = async (first_name, last_name, email, password) => {
  try {
    const { data } = await api.post('/auth/signup', { first_name, last_name, email, password})
    localStorage.setItem('token', data.token)
    return data === 'exist' && 'error'
  } catch (error) {
    console.error('Cannot Sign up', error)
  }
}