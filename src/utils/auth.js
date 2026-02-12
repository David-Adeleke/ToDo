export const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken")
}

export const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}