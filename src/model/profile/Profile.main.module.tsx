"use client"

import { getEventsByUser, IEventDto, updateEvent } from "@/api/events";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FeedEmpty } from "../feed/Feed.empty.module";
import { CardEvent } from "@/components/ui/CardEvent";
import { toast } from "sonner";
import { If } from "@/components/If";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { register } from "module";
import { Fragment, useState } from "react";
import { Form } from "@/components/Form";
import { eventSchema, useEventHookForm } from "@/hooks/event";
import { z } from "zod";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";

export function ProfileMain() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({} as DateRange)
  const [currentEvent, setCurrentEvent] = useState<string | null>(null)
  const { register, handleSubmit, errors, eventSchema, reset } = useEventHookForm()
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events-user"],
    queryFn: getEventsByUser,
    refetchInterval: false,
  })
  const queryCLient = useQueryClient()

  const { mutate: updateEventFn, isPending } = useMutation({
    mutationKey: ["updateEvent"],
    mutationFn: (eventData: IEventDto) => updateEvent(eventData),
    onSuccess: () => {
      reset({
        location: "",
        organization: "",
        eventPrice: 0,
        eventPageLink: ""
      })
      queryCLient.invalidateQueries({
        queryKey: ["events-user"],
      })
      toast("Evento atualizado com sucesso")
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
        toast("Erro ao atualizar evento", {
          description: "Não é possível atualizar o evento no momento",
          action: {
            label: "Confirmar",
            onClick: () => console.log(""),
          },
        })
      }
      if(error.response?.status === 500) {
        toast("Erro ao atualizar evento", {
          description: "Erro interno do servidor, contate o administrador do sistema",
          duration: 5000,
        })
      }
    }
  })

  function action(eventData: IEventDto) {
    updateEventFn({
      ...eventData,
      id: currentEvent as any,
      startDate: dateRange!.from as any,
      endDate: dateRange?.to as any
    })
  }

  function actionUpdateEventData(eventData: IEventDto) {
    reset(eventData)
    setCurrentEvent(eventData.id)
    setDateRange({
      from: eventData.startDate as any,
      to: eventData.endDate as any
    })
  }

  return (
    <section className="w-full flex flex-wrap items-center justify-start gap-12 pb-8">
      <If condition={events && events.length == 0 || isLoading }>
        <FeedEmpty />
      </If>

      <If condition={!isLoading && events.length > 0}>
        {
          events.map((event: any) => (
            <Sheet onOpenChange={() => actionUpdateEventData(event)} key={event.id}>
              <SheetTrigger asChild>
                <div className="w-full sm:max-w-[17rem]">
                  <CardEvent event={event} />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Atualizar informações</SheetTitle>
                </SheetHeader>
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
                      className="bg-emerald-500 flex gap-3 justify-center items-center hover:brightness-95 text-white text-lg font-medium py-3 px-4 rounded " 
                      type="submit"
                      disabled={!dateRange}
                    >
                      {
                        false ? (
                          <div className="border-4 border-t-blue-500 border-white rounded-full animate-spin ease-in-out h-6 w-6"></div>
                        ): (
                          <Fragment>
                            Salvar
                          </Fragment>
                        )
                      }
                    </button>
                  </Form.Trigger>
                </Form.Root>
              </SheetContent>
            </Sheet>
          ))
        }
      </If>
    </section>
  );
}