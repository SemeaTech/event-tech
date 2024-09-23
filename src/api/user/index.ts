import { axiosInstance } from "../axios.config"

export async function getUser() {
  const user = await axiosInstance.get("/user")

  return user.data
}