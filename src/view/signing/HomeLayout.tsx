import { DribbleContainer } from "@/components/ui/DribbleContainer.module";
import { Login } from "./Signing.module";

export function HomeLayout() {
  return (
    <main className="flex min-h-screen justify-around px-4 py-8 w-full">
      <DribbleContainer />
      <section className="space-y-10 flex flex-col justify-center items-center">
        <Login />
      </section>
    </main>
  )
}