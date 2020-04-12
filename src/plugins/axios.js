import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '@/config'

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)

export default axiosInstance
