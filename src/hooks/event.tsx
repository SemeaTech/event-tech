"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const eventSchema = z.object({
  location: z
    .string()
    .min(1, { message: "A localização é obrigatório" }),
  organization: z
    .string()
    .min(1, { message: "A organização é obrigatório" }),
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
      organization: "",
      eventPrice: 0,
      eventPageLink: ""
    }
  })

  return { register, handleSubmit, errors, eventSchema, reset }
}