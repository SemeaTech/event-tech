import { z } from "zod";
import { axiosInstance } from "../axios.config";
import { eventSchema } from "@/hooks/event";

export async function getEvents() {
  const events = await axiosInstance.get("/event")

  return events.data
}

export async function getEventsByUser() {
  const events = await axiosInstance.get("/event/user")

  return events.data
}
export interface IEventDto extends z.infer<typeof eventSchema> {
  id: string;
  startDate: string;
  endDate: string;
}

export async function addEvent(eventData: IEventDto) {
  await axiosInstance.post("/event/create", eventData)
}

export async function updateEvent(eventData: IEventDto) {
  await axiosInstance.put(`/event/update/${eventData.id}`, eventData)	
}