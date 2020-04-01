/**
 *
 * @param {节点数组} list
 * @param {id、pid, rootId字段映射} attrs
 * @param {节点生成回调} nodeSchemeFun
 */

function buildTree (list = [], { id = 'id', pid = 'pid', rootId = '' }, nodeSchemeFun) {
  let temp = list.slice(0)
  let ans = []

  for (let i = 0; i < temp.length; i++) {
    const item = temp[i]
    if (item[pid] === rootId) {
      const node = formatNode(item, nodeSchemeFun, 0)
      node && ans.push(node)
      temp.splice(i, 1)
      i--
    }
  }

  function run (tree) {
    if (temp.length !== 0) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        item.children = []

        for (let j = 0; j < temp.length; j++) {
          if (item[id] === temp[j][pid]) {
            const node = formatNode(temp[j], nodeSchemeFun, item.level + 1, [].concat(item.pIds, [item[id]]))
            node && item.children.push(node)
            temp.splice(j, 1)
            j--
          }
        }

        run(item.children)
      }
    }
  }

  run(ans)

  return ans
}

/**
 *
 * @param {原始节点} node
 * @param {节点格式映射} scheme
 */
function formatNode (node, schemeFun, level, pIds = []) {
  let formatNode = Object.assign({
    level,
    pIds
  }, node)
  if (schemeFun) {
    formatNode = schemeFun(formatNode)
  }

  return formatNode
}

export default buildTree
