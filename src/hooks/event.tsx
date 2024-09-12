"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { coerce, z } from "zod";

export const eventSchema = z.object({
  location: z
    .string()
    .min(1, { message: "A localização é obrigatório" }),
  dateEvent: z
    .string()
    .min(1, { message: "O dia do evento é obrigatório" }),
  organization: z
    .string()
    .min(1, { message: "A organização é obrigatório" }),
  eventDays: z
    .coerce.number()
    .min(1, { message: "O número de dias é obrigatório" }),
  eventPrice: z
    .coerce.number(),
  eventPageLink: z
    .string()
})

export function useEventHookForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      location: "",
      dateEvent: "",
      organization: "",
      eventDays: 0,
      eventPrice: 0,
      eventPageLink: ""
    }
  })

  return { register, handleSubmit, errors, eventSchema, reset }
}