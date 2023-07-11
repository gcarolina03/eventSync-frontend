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

export const CreateEventAPI = async (title, event_date, start_time, end_time) => {
  try {
    const { data } = await api.post('/api/events', { title, event_date, start_time, end_time }, {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    console.log({data })
    return data
  } catch (error) {
    console.error('Cannot create event', error)
  }
}