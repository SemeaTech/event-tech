import { z } from "zod";
import { axiosInstance } from "../axios.config";
import { eventSchema } from "@/hooks/event";

export async function getEvents() {
  const events = await axiosInstance.get("/event")

  return events.data
}

export async function addEvent(eventData: z.infer<typeof eventSchema>) {
  await axiosInstance.post("/event/create", eventData)
}