import { api } from "./api";

export const CreateRequestAPI = async (eventId, serviceId) => {
  try {
    const { data } = await api.post('/api/requests', { eventId, serviceId } , {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot create request', error)
  }
}

export const GetRequestsAPI = async () => {
  try {
    const { data } = await api.get('/api/requests' , {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot get requests', error)
  }
}