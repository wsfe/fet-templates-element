function getFuncCodes (portalCodes) {
  return portalCodes
}

export default getFuncCodes(window.globalConfig.portalFunc || [])
