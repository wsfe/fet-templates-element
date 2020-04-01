export default function traversalTree (nodes, callback) {
  for (let i = 0, len = nodes.length; i < len; i++) {
    const node = nodes[i]
    callback(node)
    if (node.children) {
      traversalTree(node.children, callback)
    }
  }
}
