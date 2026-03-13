import api from "../api/axios"

export const createShortUrl = async (data) => {
  const response = await api.post("/api/url/shorten", data)
  return response.data
}

export const getAnalytics = async (code) => {
  const response = await api.get(`/api/url/analytics/${code}`)
  return response.data
}