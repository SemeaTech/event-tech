"use client"

import { getEvents } from "@/api/events";
import { CardEvent } from "@/components/ui/CardEvent";
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { FiGlobe } from "react-icons/fi";
import { toast } from "sonner";
import { FeedEmpty } from "./Feed.empty.module";
import { Fragment } from "react";

export function FeedMain() {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  return (
    <section className="flex w-full flex-col space-y-8">
      <h1 className="text-gray-200 text-xl text-start font-jetbrains font-semibold">Eventos</h1>

      <section className="w-full flex flex-wrap items-center justify-start gap-12 pb-8">
        {
          isLoading || events.length === 0 && (
            <FeedEmpty />
          )
        }
        {
          !isLoading && events.length > 0 && events.map((event: any) => (
            <Dialog key={event.id}>
              <DialogTrigger asChild>
                <div className="w-full sm:max-w-[17rem]">
                  <CardEvent event={event} />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Mais informações</DialogTitle>
                </DialogHeader>
                <section className="py-4 flex justify-between flex-wrap gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-jetbrains">Localização:</span>
                    <div className="flex items-start gap-1">
                      <span className=" text-gray-200 text-base font-poppins">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-jetbrains">Data do evento:</span>
                    <div className="flex">
                      <span className="text-gray-200 text-base text-end w-full font-poppins">
                        {
                          new Intl.DateTimeFormat("pt-BR", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }).format(new Date(event.startDate))
                        }
                        {
                          event.endDate && (
                            <Fragment>
                              {" - "}
                              {
                                new Intl.DateTimeFormat("pt-BR", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                }).format(new Date(event.endDate))
                              }
                            </Fragment>
                          )
                        }
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-jetbrains">Organizador do evento:</span>
                    <div className="flex items-start gap-1">
                      <span className="text-gray-200 text-base font-poppins">{event.organization}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 font-jetbrains">Valor do ingresso:</span>
                    <div className="flex items-center gap-1 justify-start">
                      <span className="text-gray-200 text-base font-poppins">{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(event.eventPrice)
                      }</span>
                    </div>
                  </div>
                </section>
                <DialogFooter className="w-full">
                  <a 
                    onClick={() => {
                      if (!event.eventPageLink) {
                        toast("Link do evento não encontrado", {
                          description: "Não foi adicionado o link do evento a essa publicação",
                        })
                      }
                    }}
                    href={event.eventPageLink || "#"}
                    target={event.eventPageLink ? "_blank" : ""}
                    rel="noopener noreferrer"
                    className="bg-emerald-500 text-white shadow-lg text-base hover:brightness-110 py-3 cursor-pointer font-poppins rounded w-full flex gap-3 items-center justify-center">
                    <FiGlobe className="w-5 h-5" />
                    Página do evento
                  </a>

                  {/* <button className="bg-grayDark shadow-lg text-base hover:brightness-105 border-2 border-grayDark py-3 cursor-pointer font-poppins rounded w-full flex gap-3 items-center justify-center">
                    <FiCalendar className="w-5 h-5" />
                    Adicionar a agenda
                  </button> */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
      </section>
    </section>
  )
}