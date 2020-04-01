import routes from './routes'
import { menuMap } from '@/service/menu'
import traversalTree from '@/utils/traversalTree'

const DenyNotFound = () => import('@/modules/deny/404')
const DenyNotPermission = () => import('@/modules/deny/403')

export default [
  {
    path: '/',
    redirect: {
      name: 'PAGEA'
    }
  },
  ...processRoutes(routes),
  {
    path: '*',
    component: DenyNotFound
  }
]

function processRoutes (routes) {
  traversalTree(routes, (route) => {
    if (route.name) {
      const menuInfo = menuMap[route.name]
      if (menuInfo) {
        Object.assign(
          route.meta || (route.meta = {}),
          {
            title: menuInfo.title || route.meta.title,
            menuInfo
          }
        )
      } else {
        route.component = DenyNotPermission
      }
    }
  })
  return routes
}
