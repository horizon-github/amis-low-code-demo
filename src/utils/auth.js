const TOKEN_KEY = 'ZFY_JWT'

export function getAuth() {
    let auth = localStorage.getItem(TOKEN_KEY)
    return JSON.parse(auth)
}

export function setAuth(auth) {
    return localStorage.setItem(TOKEN_KEY, JSON.stringify(auth))
}

export function removeAuth() {
    return localStorage.removeItem(TOKEN_KEY)
}