import { api } from "./api";

export const GetServicesAPI = async () => {
  try {
    const { data } = await api.get('/api/profile/services')
    return data
  } catch (error) {
    console.error('Cannot get events', error)
  }
}