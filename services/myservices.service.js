import { api } from "./api";

export const GetServicesAPI = async () => {
  try {
    const { data } = await api.get('/api/profile/services', {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot get services', error)
  }
}

export const CreateServiceAPI = async (title, categoryId, cityId, max_capacity, min_capacity, selectedFile, price, start, end) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('categoryId', categoryId);
    formData.append('max_capacity', max_capacity);
    formData.append('min_capacity', min_capacity);
    formData.append('cityId', cityId);
    formData.append('price', price);
    formData.append('avatar', selectedFile);
    formData.append('start_time', start);
    formData.append('end_time', end);
    console.log(formData)


    const { data } = await api.post('/api/profile/services', formData, {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot create service', error)
  }
}

export const UpdateServiceAPI = async (id, obj) => {
  try {
    const formData = new FormData();
    formData.append('title', obj.title);
    formData.append('categoryId', obj.categoryId);
    formData.append('max_capacity', obj.max_capacity);
    formData.append('min_capacity', obj.min_capacity);
    console.log(obj)
    /* formData.append('cityId', obj.cityId);
    formData.append('price', obj.price);
    formData.append('avatar', obj.selectedFile);
    formData.append('start_time', obj.start);
    formData.append('end_time', obj.end); */

    const { data } = await api.put(`/api/profile/services/${id}`, formData, {
        headers: {
        token: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.error('Cannot update event', error)
  }
}