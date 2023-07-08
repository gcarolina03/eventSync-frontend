import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.baseURL,
  timeout: 3000
})