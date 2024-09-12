import { FiXCircle } from "react-icons/fi"

export function FeedEmpty() {
  return (
    <section className="text-gray-400 flex flex-col justify-center items-center w-full">
      <FiXCircle className="w-8 h-8 text-gray-400" />
      <p className="text-gray-400 font-poppins text-lg">Não há eventos para mostrar</p>
    </section>
  )
}