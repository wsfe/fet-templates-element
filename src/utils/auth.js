const TokenKey = 'Authorization-Token'
let authToken = localStorage.getItem(TokenKey)

export function getToken () {
  return authToken
}

export function setToken (token) {
  if (token === authToken) {
    return authToken
  }
  authToken = token
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  authToken = ''
  return localStorage.removeItem(TokenKey)
}
