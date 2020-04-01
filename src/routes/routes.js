import MainLayout from '@/layout/MainLayout'
// import EmptyLayout from '@/layout/EmptyLayout'

const PageA = () => import('@/modules/moduleA/pageA')

/**
 * meta配置项说明
 * title：当menuData没有配置title时生效
 */

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'a', name: 'PAGEA', component: PageA }
    ]
  }
]

