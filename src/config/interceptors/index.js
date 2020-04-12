import axiosInterceptor from './axios'
import routerInterceptor from './router'

export default function(pluginInstances) {
  axiosInterceptor(pluginInstances)
  routerInterceptor(pluginInstances)
}
