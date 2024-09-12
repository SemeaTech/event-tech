"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function isGmailValid(mail: string) {
  return mail.includes("gmail.com") || mail.includes("hotmail.com")
}

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O email é obrigatório" })
    .email({ message: "Formato de e-mail inválido" })
    .refine((mail) => isGmailValid(mail), { message: "Email não suportado" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter ao menos 8 carácteres" })
})

export function useLoginHookForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  return { register, handleSubmit, errors, loginSchema, reset }
}