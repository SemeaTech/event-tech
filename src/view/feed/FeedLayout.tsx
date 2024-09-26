import { Suspense } from "react";
import { FeedHeader } from "./Feed.header.module";
import { FeedMain } from "./Feed.main.module";

export function FeedLayout() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <section className="max-w-7xl w-full px-8 md:px-6">
        <Suspense fallback={<div>Carregando...</div>}>
          <FeedHeader />
        </Suspense>
        <FeedMain />
      </section>
    </main>
  )
}