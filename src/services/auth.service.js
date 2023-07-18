import { api } from "./api";

export const LoginAPI = async (email, password) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    return data === 'incorrect' && 'error'
  } catch (error) {
    console.error('Cannot Login', error)
  }
}

export const SignUpAPI = async (firstName, lastName, email, password, selectedFile) => {
  try {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', selectedFile);

    const { data } = await api.post('/api/auth/signup', formData)
    localStorage.setItem('token', data.token)
    return data === 'exist' && 'error'
  } catch (error) {
    console.error('Cannot Sign up', error)
  }
}