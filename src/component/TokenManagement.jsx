export const getHeaders = () => {
  const token = localStorage.getItem("token")
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  return headers
}

export const setToken = (token) => {
  localStorage.setItem("token", token)
}

export const clearToken = () => {
  localStorage.removeItem("token")
}
