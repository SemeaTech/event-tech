"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function isGmailValid(mail: string) {
  return mail.includes("gmail.com") || mail.includes("hotmail.com")
}

const loginSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .max(50, { message: "O nome deve ter no máximo 50 carácteres" }),
  email: z
    .string()
    .min(1, { message: "O email é obrigatório" })
    .email({ message: "Formato de e-mail inválido" })
    .refine((mail) => isGmailValid(mail), { message: "Email não suportado" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter ao menos 8 carácteres" })
})

export function useSignupHookForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      name: "",
      password: ""
    }
  })

  return { register, handleSubmit, errors, loginSchema, reset }
}