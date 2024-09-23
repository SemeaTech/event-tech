"use client"

import { Form } from "@/components/Form";
import { useMutation } from "@tanstack/react-query";
import { Fragment } from "react";
import { z } from "zod";
import { FiLogIn } from "react-icons/fi";
import { SignupHeader } from "./SignupHeader.submodule";
import { SignupFooter } from "./SignupFooter.submodule";
import Link from "next/link";
import { signup } from "@/api/signup";
import { useSignupHookForm } from "@/hooks/signup";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Signup() {
  const { register, handleSubmit, errors, loginSchema, reset } = useSignupHookForm()
  const router = useRouter()

  const { mutate: actionFn, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials: z.infer<typeof loginSchema>) => signup(credentials),
    onSuccess: () => {
      reset({
        name: "",
        email: "",
        password: "",
      })
      toast("Conta criada com sucesso")
      router.push("/signin")
    },
    onError: (error: any) => {
      if(error.response?.status === 400) {
        toast("Erro ao fazer login", {
          description: "Não é possível criar uma conta com esse email",
          action: {
            label: "Confirmar",
            onClick: () => console.log(""),
          },
        })
      }
      if(error.response?.status === 500) {
        toast("Erro ao tentar criar a conta", {
          description: "Erro interno do servidor, contate o administrador do sistema",
          duration: 5000,
        })
      }
    }
  })

  function action(userCredentials: z.infer<typeof loginSchema>) {
    actionFn(userCredentials)
  }

  return (
    <Fragment>
      <SignupHeader />
      <Form.Root className="sm:w-96 md:w-[500px] w-full space-y-4" onSubmit={handleSubmit(action)}>
        <section className="space-y-2">
          <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="email">Nome</Form.Label>
          <Form.Field
            type="name"
            id="name"
            className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
            placeholder="Viktor toropov"
            {...register("name")}
          />
          {errors.name && <span className="text-red-500 pt-2 text-sm">{errors.name.message}</span>}
        </section>

        <section className="space-y-2">
          <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="email">Email</Form.Label>
          <Form.Field
            type="email"
            id="email"
            className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
            placeholder="seu@email.com"
            {...register("email")}
          />
          {errors.email && <span className="text-red-500 pt-2 text-sm">{errors.email.message}</span>}
        </section>
        
        <section className="space-y-2">
          <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="pasword">Senha</Form.Label>
          <Form.Field
            type="password"
            id="pasword"
            placeholder="********"
            className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md"
            {...register("password")}
          />
          {errors.password && <span className="text-red-500 pt-2 text-sm">{errors.password.message}</span>}
        </section>
        <Form.Trigger>
          <button 
            className="bg-emerald-500 flex gap-3 justify-center items-center hover:brightness-95 text-white text-lg font-medium py-3 px-4 rounded w-full" 
            type="submit"
          >
            {
              isPending ? (
                <div className="border-4 border-t-blue-500 border-white rounded-full animate-spin ease-in-out h-6 w-6"></div>
              ): (
                <Fragment>
                  Entrar
                  <FiLogIn className="w-6 h-6" />
                </Fragment>
              )
            }
          </button>
        </Form.Trigger>

        <section className="w-full text-white font-poppins font-normal flex gap-2">
          Já possui uma conta?
          <Link className="text-green-500 hover:brightness-95 font-medium" href="/signin?mode=anonymous">
            Acessar
          </Link>
        </section>
      </Form.Root>
      <SignupFooter />
    </Fragment>
  );
}
