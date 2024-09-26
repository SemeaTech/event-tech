import { TooltipHover } from "@/components/Tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FiInfo } from "react-icons/fi";

export function SignupFooter() {
  const router = useRouter();
  return (
    <Fragment>
      <div className="flex gap-2 w-full justify-center items-center">
        <span className="bg-grayDark h-[1px] flex-1"></span>
        <h2 className="text-white">Ou</h2>
        <span className="bg-grayDark h-[1px] flex-1"></span>
      </div>

      <section className="w-full text-white">
        <TooltipHover message="Podem apenas visualizar eventos">
          <button onClick={() => router.push("/?mode=anonymous")} className="bg-grayDark text-base hover:brightness-95 border-2 border-grayDark cursor-pointer py-3 font-poppins rounded w-full flex gap-3 items-center justify-center">
            <Image src="/anonymous.svg" alt="Ícone Anônimo" width={24} height={24} />
            Contiunuar como anônimo
          </button>
        </TooltipHover>
      </section>
    </Fragment>
  )
}