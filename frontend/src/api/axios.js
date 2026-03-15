import axios from "axios"
import appConfig from "@/config/appConfig"

const api = axios.create({
  baseURL: appConfig.API_BASE_URL,
  timeout: appConfig.API_BASE_URL_TIMEOUT
})

export default api