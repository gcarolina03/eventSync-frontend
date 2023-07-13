import { api } from "./api";

export const GiveReviewAPI = async (serviceId, thumb) => {
  try {
    const { data } = await api.post('/api/reviews', { serviceId, thumb }, {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot create reviews', error)
  }
}

export const UpdateReviewAPI = async (id, thumb) => {
  try {
    const { data } = await api.put(`/api/reviews/${id}`, { thumb }, {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot update reviews', error)
  }
}