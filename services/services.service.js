import { api } from "./api";

export const GetServicesAPI = async () => {
  try {
    const { data } = await api.get('/api/services')
    return data
  } catch (error) {
    console.error('Cannot get services', error)
  }
}