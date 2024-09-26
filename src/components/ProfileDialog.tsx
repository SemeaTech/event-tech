"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Fragment, useState } from "react";
import { Form } from "@/components/Form";
import { FiChevronDown, FiShare, FiUser, FiLogOut, FiLogIn, FiPlus, FiHome } from "react-icons/fi";
import { DialogHeader,Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { addEvent, IEventDto } from "@/api/events";
import { logout } from "@/api/login";
import { useEventHookForm } from "@/hooks/event";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./ui/DateRangePicker";

export function ProfileDialog() {
  const router = useSearchParams()
  const modeLogin = router.get("mode")
  const queryCLient = useQueryClient()
  const navigate = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({} as DateRange)

  const { register, handleSubmit, errors, eventSchema, reset } = useEventHookForm()

  const { mutate: logoutFn } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      navigate.push("/signin?mode=anonymous")
      toast("Logout efetuado com sucesso")
    },
    onError: (error: any) => {
      if(error.response?.status === 500) {
        toast("Erro ao fazer logout", {
          description: "Erro interno do servidor, contate o administrador do sistema",
          duration: 5000,
        })
      }
    }
  })

  const { mutate: addEventFn, isPending } = useMutation({
    mutationKey: ["addEvent"],
    mutationFn: (eventData: IEventDto) => addEvent(eventData),
    onSuccess: () => {
      reset({
        location: "",
        organization: "",
        eventPrice: 0,
        eventPageLink: ""
      })
      queryCLient.invalidateQueries({
        queryKey: ["events"],
      })
      queryCLient.invalidateQueries({
        queryKey: ["events-user"],
      })
      toast("Evento adicionado com sucesso")
    },
    onError: (error: any) => {
      if(error.response?.status === 401) {
        toast("Não autorizado",  {
          description: "Faça login e tente novamente",
          action: {
            label: "Confirmar",
            onClick: () => console.log(""),
          },
        })
      }
      if(error.response?.status === 400) {
        toast("Erro ao criar evento", {
          description: "Não é possível criar o evento no momento",
          action: {
            label: "Confirmar",
            onClick: () => console.log(""),
          },
        })
      }
      if(error.response?.status === 500) {
        toast("Erro ao fazer login", {
          description: "Erro interno do servidor, contate o administrador do sistema",
          duration: 5000,
        })
      }
    }
  })

  function action(eventData: IEventDto) {
    addEventFn({
      ...eventData,
      startDate: dateRange?.from as any,
      endDate: dateRange?.to as any
    })
  }
  function actionLogout() {
    logoutFn()
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <button className="flex items-center gap-2 bg-transparent outline-none">
            <FiChevronDown className="h-4 w-4 text-gray-200" />
            <Image src="/avatar-anonymous.svg" alt="Logo" width={32} height={32} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-medium mr-5 mt-2">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/" className="flex flex-1 items-center gap-2 bg-transparent outline-none">
                <FiHome className="h-4 w-4" />
                <span>Início</span>
              </Link>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem disabled={modeLogin === "anonymous"} className="cursor-pointer">
                <FiShare className="mr-2 h-4 w-4" />
                <span>Compartitlhar evento</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuItem disabled={modeLogin === "anonymous"} className="cursor-pointer">
              <Link href="/profile" className="flex flex-1 items-center gap-2 bg-transparent outline-none">
                <FiUser className="h-4 w-4" />
                <span>Meu perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={modeLogin === "anonymous"} className="text-red-500 cursor-pointer">
              <button onClick={() => actionLogout()} className="flex flex-1 items-center gap-2 bg-transparent outline-none">
                <FiLogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
            {
              modeLogin === "anonymous" && (
                <DropdownMenuItem className="cursor-pointer">
                  <Link className="flex-1 flex items-center gap-2" href="/signin">
                    <FiLogIn className="h-4 w-4" />
                    <span>Fazer login</span>
                  </Link>
                </DropdownMenuItem>
              ) 
            }
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Compartilhar evento</DialogTitle>
        </DialogHeader>

        <Form.Root className="w-full space-y-4" onSubmit={handleSubmit(action as any)}>
          <section className="space-y-2">
            <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="location">Localização</Form.Label>
            <Form.Field
              type="text"
              id="location"
              className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
              placeholder="São Paulo, SP"
              {...register("location")}
            />
            {errors.location && <span className="text-red-500 pt-2 text-sm">{errors.location.message}</span>}
          </section>

          <section className="space-y-2">
            <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="dateEvent">Data do evento</Form.Label>
            <DateRangePicker
              handleChangeDate={(date: any) => setDateRange(date)}
              date={dateRange as DateRange}
            />
            {!dateRange && <span className="text-red-500 pt-2 text-sm">A data é obrigatória</span>}
          </section>

          <section className="space-y-2">
            <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="organization">Organizador do evento</Form.Label>
            <Form.Field
              type="text"
              id="organization"
              className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
              placeholder="Github"
              {...register("organization")}
            />
            {errors.organization && <span className="text-red-500 pt-2 text-sm">{errors.organization.message}</span>}
          </section>

          <section className="space-y-2">
            <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="eventPrice">Valor do ingresso</Form.Label>
            <Form.Field
              type="number"
              id="eventPrice"
              className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
              {...register("eventPrice")}
            />
            {errors.eventPrice && <span className="text-red-500 pt-2 text-sm">{errors.eventPrice.message}</span>}
          </section>

          <section className="space-y-2">
            <Form.Label className="text-gray-200 font-medium font-jetbrains" htmlFor="eventPageLink">Link oficial</Form.Label>
            <Form.Field
              type="text"
              id="eventPageLink"
              className="bg-transparent border-2 border-grayDark py-6 text-gray-400 text-md focus:ring-green-500 font-poppins"
              {...register("eventPageLink")}
            />
            {errors.eventPageLink && <span className="text-red-500 pt-2 text-sm">{errors.eventPageLink.message}</span>}
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
                    Adicionar
                    <FiPlus className="w-6 h-6" />
                  </Fragment>
                )
              }
            </button>
          </Form.Trigger>
        </Form.Root>
      </DialogContent>
    </Dialog>
  )
}