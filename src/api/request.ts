import axios, { AxiosError, AxiosInstance } from "axios"
import { API_URL } from "@/config/env"
// import { apiRefresh } from "./auth"

const requests = [API_URL]
  .filter((url) => url)
  .map((url) => {
    const request = axios.create({ baseURL: `${url}` })
    // add JWT token to request header
    request.interceptors.request.use((config) => {
      const token = JSON.parse(sessionStorage.getItem("token") ?? "null")
      config.headers["Authorization"] = `Bearer ${token}`
      return config
    })
    request.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status !== 401 || originalRequest._retry) {
          return Promise.reject(error)
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`
              return request(originalRequest)
            })
            .catch((err) => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true
        // try {
        //   const refresh = JSON.parse(sessionStorage.getItem("refresh") || "")
        //   const {
        //     data: { access },
        //   } = await apiRefresh({ refresh })
        //   sessionStorage.setItem("token", JSON.stringify(access))
        //   window.dispatchEvent(new Event("session-storage")) // 觸發 sessionStorage 事件並同步更新 useSessionStorage()
        //   isRefreshing = false
        //   originalRequest.headers["Authorization"] = `Bearer ${access}`
        //   const newRequest = await request(originalRequest)
        //   processQueue(null, access)
        //   return newRequest
        // } catch (err) {
        //   processQueue(err as Error, null)
        //   if (axios.isAxiosError(err) && err.response?.status === 401) {
        //     alert("登入逾時，請重新登入")
        //     window.location.href = "/"
        //     sessionStorage.clear()
        //   }
        //   return Promise.reject(err)
        // }
            window.location.href = "/"

      },
    )
    return request
  })

// handle refresh token with queue
const refreshQueue: {
  resolve: (token: string | null) => void
  reject: (error: Error | AxiosError | null) => void
}[] = []
let isRefreshing = false

// function processQueue(error: Error | AxiosError | null, token: string | null) {
//   refreshQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error)
//     } else {
//       prom.resolve(token)
//     }
//   })
//   refreshQueue = []
// }

export const request = requests[0] as AxiosInstance
