import { ProfileDialog } from "@/components/ProfileDialog";
import Image from "next/image";
import Link from "next/link";

export function FeedHeader() {
  
  return (
    <header className="flex w-full py-16 items-center justify-between">
      <section className="text-gray-200 flex text-xl font-jetbrains">
        <h2 className="flex items-center gap-2">
          <Link href="/" className="text-gray-200 font-poppins">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </Link>
          Bem vindo
        </h2>
      </section>
      <ProfileDialog />
    </header>
  )
}