import { DribbleContainer } from "../../components/ui/DribbleContainer.module";
import { Signup } from "./Signup.module";

export function SignupLayout() {
  return (
    <main className="flex min-h-screen justify-around px-4 py-8 w-full">
      <DribbleContainer />
      <section className="space-y-10 flex flex-col justify-center items-center">
        <Signup />
      </section>
    </main>
  )
}