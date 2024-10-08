import { Suspense } from "react";
import { ProfileHeader } from "./Profile.header.module";
import { ProfileMain } from "./Profile.main.module";

export function ProfileLayout() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <section className="max-w-7xl w-full px-8 md:px-6">
        <Suspense fallback={<div>Carregando...</div>}>
          <ProfileHeader />
        </Suspense>
        <ProfileMain />
      </section>
    </main>
  )
}