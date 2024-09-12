import { axiosInstance } from "../axios.config";

export async function login<T>(userCredentials: T) {
  await axiosInstance.post("/session/login", userCredentials)
}

export async function logout() {
  await axiosInstance.post("/session/logout")
}