import { axiosInstance } from "../axios.config";

export async function signup<T>(userCredentials: T) {
  await axiosInstance.post("/user/register", userCredentials)
}