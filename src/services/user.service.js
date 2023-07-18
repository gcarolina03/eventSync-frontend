import { api } from "./api";

export const GetProfileAPI = async () => {
  try {
    const { data } = await api.get('/api/profile',  {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot get profile', error)
  }
}