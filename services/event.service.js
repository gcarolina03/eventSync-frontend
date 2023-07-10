import { api } from "./api";

export const GetEventsAPI = async () => {
  try {
    const { data } = await api.get('/api/events',  {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot get events', error)
  }
}