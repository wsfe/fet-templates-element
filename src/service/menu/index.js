import buildTree from '@/utils/buildTree'

// 数据来源
const portalMenu = window.globalConfig.portalMenu

const menuMap = {}
let menuData = {}

menuData = buildTree(portalMenu, {
  id: 'code',
  pid: 'pCode',
  rootId: '0'
}, (node) => {
  const { code, pCode, cn, url, pIds, show } = node

  node.id = code
  node.pid = pCode
  node.name = code
  node.pNames = pIds
  node.title = cn
  node.path = url
  // 应该高亮的菜单项
  // 如果当前菜单可见，高亮自己
  // 如果当前菜单不可见，高亮其最近的一个可见父菜单
  node.activeName = show ? node.name : getRecentVisibleParent(pIds)

  // 存储到menuMap
  menuMap[code] = node

  return node
})

// 获取最近的一个可见父菜单
function getRecentVisibleParent (pNames) {
  if (!pNames.length) return ''

  let res = ''
  for (let i = pNames.length - 1; i >= 0; i--) {
    const name = pNames[i]
    const menu = menuMap[name]
    if (menu.show) {
      res = menu.name
      break
    }
  }
  return res
}

export {
  menuMap
}

export default menuData
