import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.baseURL,
  timeout: 3000
})

const API_KEY = 'AIzaSyAgvQ8hDqeCGT8nvwT3oXS0KrEBwCu0nkA'; // Replace with your Google Maps Geocoding API key

export const getAddressFromLatLng = async (latitude, longitude) => {
  try {
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
    );
    if (response.data.results.length > 0) {
      const { address_components } = response.data.results[0];
      return address_components;
    } else {
      throw new Error('Unable to retrieve address.');
    }
  } catch (error) {
    console.error(error)
  }
};