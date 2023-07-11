import { api } from "./api";

export const GetCitiesAPI = async () => {
  try {
    const { data } = await api.get('/api/cities', {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot get cities', error)
  }
}