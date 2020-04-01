import FUNC_CODES from '@/service/permission'

let cache = {}

function existFuncCode (permission, routeName) {
  // 没有该路由的功能码，直接返回false
  if (!FUNC_CODES[routeName] || !FUNC_CODES[routeName].length) return false

  const key = `${permission}-${routeName}`
  // 先从cache取， 无则计算并存储到cache中
  return cache[key] !== undefined
    ? cache[key]
    : (cache[key] = FUNC_CODES[routeName].indexOf(permission) > -1)
}

/**
 * permission: 功能码，可以是字符串也可以是数组，如果是数组，则为或的关系
 * routeName: 功能码所属菜单的路由name
 */
function havePermisson (permission, routeName) {
  const context = this
  routeName = routeName || (context && context.$route && context.$route.name)

  // 取不到路由，则返回false
  if (!routeName) return false

  // 将permission转化为数组，关系为或，只其中一个存在就返回true
  if (!Array.isArray(permission)) {
    permission = [permission]
  }

  return permission.some(code => existFuncCode(code, routeName))
}

export default havePermisson
