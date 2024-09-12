import Image from "next/image";

export function DribbleContainer() {
  return (
    <div className="hidden xl:grid place-content-center">
      <Image src="/network-world.svg" alt="Event Tech" width={450} height={450} />
    </div>
  )
}