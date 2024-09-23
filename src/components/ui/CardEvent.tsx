import Image from "next/image";
import { FiMapPin } from "react-icons/fi";

interface IFeedProps {
  event: {
    id: string,
    location: string,
    dateEvent: string,
    organization: string,
    eventDays: number,
    eventPrice: number,
    eventPageLink: string,
    user: {
      id: string,
      name: string,
    }
  }
}

export function CardEvent({ event }: IFeedProps) {
  return (
    <div className="px-8 w-full sm:max-w-[17rem] border-2 border-grayDark rounded-xl space-y-7 p-4 cursor-pointer shadow-xl hover:scale-105 transition-transform">
      <section className="flex items-center gap-2">
        <Image src="/avatar-anonymous.svg" alt="Logo" width={36} height={36} />
        <div className="flex items-start gap flex-col">
          <span className="text-base text-clip w-full text-semibold font-poppins text-gray-200">
            {event.user.name.split(" ")[0]}
          </span>
          <span className="text-xs text-semibold font-poppins text-gray-400">Compartilhou</span>
        </div>
      </section>

      <section className="flex flex-col gap-2 text-gray-400">
        <h2 className="text-md font-jetbrains text-gray-200">{event.organization}</h2>
        
        <div className="flex items-center gap-1">
          <FiMapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </section>
    </div>
  )
}
      